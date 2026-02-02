import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { GetCompanyInput } from '../dto/input/get-company.input';
import { GetCompanyResponseOutput } from '../dto/output';
import { Company } from '../entities/company.entity';
import { mapCompanyToOutput } from '../utils';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async getCompany(input: GetCompanyInput): Promise<GetCompanyResponseOutput> {
    try {
      const { companyId, companyTicker, country } = input;

      const normalizedTicker = companyTicker?.trim();

      const page = input?.page ?? 1;
      const limit = input?.limit ?? 10;

      const where: FindOptionsWhere<Company> = {};
      if (typeof companyId === 'number') where.companyId = companyId;
      if (normalizedTicker) {
        where.companyTicker = ILike(normalizedTicker);
      }

      const countryCode = country?.trim();
      const isAllCountries = countryCode?.toLowerCase() === 'all';

      if (countryCode && !isAllCountries) {
        where.companyCountry = ILike(countryCode);
      }

      const [companies, total] = await this.companyRepository.findAndCount({
        where,
        relations: {
          events: true,
        },
        order: {
          createdAt: 'ASC',
        },
        take: limit,
        skip: (page - 1) * limit,
      });

      if ((companyId || normalizedTicker) && companies.length === 0) {
        throw new NotFoundException('Company not found');
      }

      const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

      return {
        data: companies.map(mapCompanyToOutput),
        meta: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    } catch (error) {
      this.logger.error({ stack: error?.stack, message: error?.message });
      throw error;
    }
  }
}
