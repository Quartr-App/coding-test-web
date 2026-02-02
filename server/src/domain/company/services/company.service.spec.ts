import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { CompanyService } from './company.service';

jest.mock('../utils', () => ({
  mapCompanyToOutput: (company: any) => company,
}));

describe(CompanyService.name, () => {
  const companyRepository = {
    findAndCount: jest.fn(),
  };

  let service: CompanyService;

  beforeEach(async () => {
    jest.resetAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useValue: companyRepository,
        },
      ],
    }).compile();

    service = moduleRef.get(CompanyService);
  });

  it('treats country=All as no filter', async () => {
    companyRepository.findAndCount.mockResolvedValueOnce([[{ id: '1' }], 1]);

    await service.getCompany({
      country: 'All',
      page: 1,
      limit: 10,
    } as any);

    expect(companyRepository.findAndCount).toHaveBeenCalledTimes(1);

    const args = companyRepository.findAndCount.mock.calls[0][0];
    expect(args.where).toEqual({});
  });

  it('still filters when country is specific', async () => {
    companyRepository.findAndCount.mockResolvedValueOnce([[], 0]);

    await service.getCompany({
      country: 'NO',
      page: 1,
      limit: 10,
    } as any);

    const args = companyRepository.findAndCount.mock.calls[0][0];
    expect(args.where).toEqual({ companyCountry: expect.anything() });
  });

  it('treats country=all (case-insensitive) as no filter', async () => {
    companyRepository.findAndCount.mockResolvedValueOnce([[{ id: '1' }], 1]);

    await service.getCompany({ country: 'all' } as any);

    const args = companyRepository.findAndCount.mock.calls[0][0];
    expect(args.where).toEqual({});
  });

  it('trims country before checking for "all"', async () => {
    companyRepository.findAndCount.mockResolvedValueOnce([[{ id: '1' }], 1]);

    await service.getCompany({ country: '  All  ' } as any);

    const args = companyRepository.findAndCount.mock.calls[0][0];
    expect(args.where).toEqual({});
  });

  it('uses default pagination (page=1, limit=10) when omitted', async () => {
    companyRepository.findAndCount.mockResolvedValueOnce([[{ id: '1' }], 1]);

    const result = await service.getCompany({} as any);

    const args = companyRepository.findAndCount.mock.calls[0][0];
    expect(args.take).toBe(10);
    expect(args.skip).toBe(0);
    expect(result.meta).toEqual({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
  });

  it('calculates skip correctly from page and limit', async () => {
    companyRepository.findAndCount.mockResolvedValueOnce([[{ id: '1' }], 1]);

    await service.getCompany({ page: 3, limit: 5 } as any);

    const args = companyRepository.findAndCount.mock.calls[0][0];
    expect(args.take).toBe(5);
    expect(args.skip).toBe(10);
  });

  it('returns totalPages=0 when total=0', async () => {
    companyRepository.findAndCount.mockResolvedValueOnce([[], 0]);

    const result = await service.getCompany({ page: 1, limit: 10 } as any);

    expect(result.meta.totalPages).toBe(0);
  });

  it('throws NotFoundException when companyId is provided and no rows returned', async () => {
    companyRepository.findAndCount.mockResolvedValueOnce([[], 0]);

    await expect(
      service.getCompany({ companyId: 123 } as any),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws NotFoundException when companyTicker is provided and no rows returned', async () => {
    companyRepository.findAndCount.mockResolvedValueOnce([[], 0]);

    await expect(
      service.getCompany({ companyTicker: 'OKEA' } as any),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('trims companyTicker before applying the filter', async () => {
    companyRepository.findAndCount.mockResolvedValueOnce([[{ id: '1' }], 1]);

    await service.getCompany({ companyTicker: '  OKEA  ' } as any);

    const args = companyRepository.findAndCount.mock.calls[0][0];
    expect(args.where).toEqual({ companyTicker: expect.anything() });
  });

  it('does not treat whitespace-only companyTicker as a filter', async () => {
    companyRepository.findAndCount.mockResolvedValueOnce([[], 0]);

    await expect(
      service.getCompany({ companyTicker: '   ' } as any),
    ).resolves.toEqual({
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
    });

    const args = companyRepository.findAndCount.mock.calls[0][0];
    expect(args.where).toEqual({});
  });

  it('passes relations/events and stable order to TypeORM', async () => {
    companyRepository.findAndCount.mockResolvedValueOnce([[{ id: '1' }], 1]);

    await service.getCompany({} as any);

    const args = companyRepository.findAndCount.mock.calls[0][0];
    expect(args.relations).toEqual({ events: true });
    expect(args.order).toEqual({ createdAt: 'ASC' });
  });
});
