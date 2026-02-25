import { render, screen } from '@testing-library/react';
import { CompanyList } from './CompanyList';
import { useCompanies } from '../../hooks/useCompanies';
import type { Company } from '../../types/company';

jest.mock('../../hooks/useCompanies');

const mockUseCompanies = useCompanies as jest.MockedFunction<typeof useCompanies>;

const mockCompanies: Company[] = [
  {
    companyId: 1,
    companyName: 'OKEA',
    companyCountry: 'NO',
    companyTicker: 'OKA',
    displayName: 'OKEA',
    infoUrl: 'https://www.okea.no/about/',
    liveUrl: 'https://www.okea.no/investor/',
    logoLightUrl: 'https://files.quartr.com/logo-light-1.png',
    logoDarkUrl: 'https://files.quartr.com/logo-dark-1.png',
    iconUrl: null,
    description: 'An oil and gas company.',
    reportingCurrency: 'NOK',
    colorSettings: { brandColor: '#ffffff' },
    events: [
      {
        reportUrl: 'https://files.quartr.com/report-1.pdf',
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
  },
  {
    companyId: 2,
    companyName: 'Magnora',
    companyCountry: 'NO',
    companyTicker: 'MGN',
    displayName: 'Magnora',
    infoUrl: 'https://magnoraasa.com/',
    liveUrl: 'https://magnoraasa.com/investors/',
    logoLightUrl: 'https://files.quartr.com/logo-light-2.png',
    logoDarkUrl: 'https://files.quartr.com/logo-dark-2.png',
    iconUrl: null,
    description: 'A renewable energy development company.',
    reportingCurrency: 'NOK',
    colorSettings: { brandColor: '#3c8ab4' },
    events: [
      {
        reportUrl: 'https://files.quartr.com/report-2.pdf',
        pdfUrl: null,
        eventId: 2,
        eventTitle: 'Q3 2022',
        eventDate: '2022-11-07T09:00:00.000Z',
        qnaTimestamp: null,
        fiscalPeriod: 'Q3',
        fiscalYear: '2022'
      }
    ],
    isins: []
  }
];

describe('CompanyList', () => {
  it('shows a loading indicator while companies are being fetched', () => {
    mockUseCompanies.mockReturnValue({ companies: [], isLoading: true, error: null });

    render(<CompanyList />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows an error message when fetching companies fails', () => {
    mockUseCompanies.mockReturnValue({
      companies: [],
      isLoading: false,
      error: 'Failed to load companies'
    });

    render(<CompanyList />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/failed to load companies/i)).toBeInTheDocument();
  });

  it('shows an empty state message when no companies are returned', () => {
    mockUseCompanies.mockReturnValue({ companies: [], isLoading: false, error: null });

    render(<CompanyList />);

    expect(screen.getByText(/no companies/i)).toBeInTheDocument();
  });

  it('renders a list of companies when data is loaded', () => {
    mockUseCompanies.mockReturnValue({ companies: mockCompanies, isLoading: false, error: null });

    render(<CompanyList />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders the correct number of company cards', () => {
    mockUseCompanies.mockReturnValue({ companies: mockCompanies, isLoading: false, error: null });

    render(<CompanyList />);

    expect(screen.getAllByRole('article')).toHaveLength(mockCompanies.length);
  });

  it('renders all company display names', () => {
    mockUseCompanies.mockReturnValue({ companies: mockCompanies, isLoading: false, error: null });

    render(<CompanyList />);

    expect(screen.getByText('OKEA')).toBeInTheDocument();
    expect(screen.getByText('Magnora')).toBeInTheDocument();
  });

  it('does not show an error when loading', () => {
    mockUseCompanies.mockReturnValue({ companies: [], isLoading: true, error: null });

    render(<CompanyList />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
