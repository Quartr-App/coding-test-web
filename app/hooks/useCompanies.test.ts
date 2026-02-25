import { renderHook, waitFor } from '@testing-library/react';
import { useCompanies } from './useCompanies';
import type { Company } from '../types/company';

const mockCompany: Company = {
  companyId: 1,
  companyName: 'OKEA',
  companyCountry: 'NO',
  companyTicker: 'OKEA',
  displayName: 'OKEA',
  infoUrl: 'https://www.okea.no/about/',
  liveUrl: 'https://www.okea.no/investor/',
  logoLightUrl: 'https://files.quartr.com/logo-light.png',
  logoDarkUrl: 'https://files.quartr.com/logo-dark.png',
  iconUrl: 'https://files.quartr.com/icon.png',
  description: 'An oil and gas company.',
  reportingCurrency: 'NOK',
  colorSettings: { brandColor: '#ffffff' },
  events: [
    {
      reportUrl: 'https://files.quartr.com/report.pdf',
      pdfUrl: null,
      eventId: 1,
      eventTitle: 'Q3 2022',
      eventDate: '2022-10-26T08:00:00.000Z',
      qnaTimestamp: null,
      fiscalPeriod: 'Q3',
      fiscalYear: '2022'
    }
  ],
  isins: []
};

function mockFetchPending() {
  jest.spyOn(global, 'fetch').mockReturnValue(new Promise(() => {}));
}

function mockFetchSuccess(data: unknown) {
  jest
    .spyOn(global, 'fetch')
    .mockResolvedValue({ ok: true, json: () => Promise.resolve(data) } as Response);
}

function mockFetchError(status: number) {
  jest
    .spyOn(global, 'fetch')
    .mockResolvedValue({ ok: false, status, json: () => Promise.resolve({}) } as Response);
}

describe('useCompanies', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns isLoading as true initially', () => {
    mockFetchPending();

    const { result } = renderHook(() => useCompanies());

    expect(result.current.isLoading).toBe(true);
  });

  it('returns an empty companies array initially', () => {
    mockFetchPending();

    const { result } = renderHook(() => useCompanies());

    expect(result.current.companies).toEqual([]);
  });

  it('returns null error initially', () => {
    mockFetchPending();

    const { result } = renderHook(() => useCompanies());

    expect(result.current.error).toBeNull();
  });

  it('sets isLoading to false after a successful fetch', async () => {
    mockFetchSuccess({ data: [mockCompany] });

    const { result } = renderHook(() => useCompanies());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('returns companies from the API after a successful fetch', async () => {
    mockFetchSuccess({ data: [mockCompany] });

    const { result } = renderHook(() => useCompanies());

    await waitFor(() => {
      expect(result.current.companies).toEqual([mockCompany]);
    });
  });

  it('fetches from the /api/companies endpoint', async () => {
    const fetchSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: [] }) } as Response);

    renderHook(() => useCompanies());

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/api/companies');
    });
  });

  it('sets error when the fetch request fails', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useCompanies());

    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });
  });

  it('sets isLoading to false after a failed fetch', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useCompanies());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('returns an empty companies array when fetch fails', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useCompanies());

    await waitFor(() => {
      expect(result.current.companies).toEqual([]);
    });
  });

  it('sets error when the API response is not ok', async () => {
    mockFetchError(500);

    const { result } = renderHook(() => useCompanies());

    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });
  });
});
