import { render, screen } from '@testing-library/react';
import { CompanyCard } from './CompanyCard';
import type { Company } from '../../types/company';

const mockCompany: Company = {
  companyId: 1,
  companyName: 'OKEA ASA',
  companyCountry: 'NO',
  companyTicker: 'OKA',
  displayName: 'OKEA',
  infoUrl: 'https://www.okea.no/about/',
  liveUrl: 'https://www.okea.no/investor/',
  logoLightUrl: 'https://files.quartr.com/logo-light.png',
  logoDarkUrl: 'https://files.quartr.com/logo-dark.png',
  iconUrl: 'https://files.quartr.com/icon.png',
  description: 'An oil and gas company on the Norwegian continental shelf.',
  reportingCurrency: 'NOK',
  colorSettings: { brandColor: '#3c8ab4' },
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

const mockCompanyNoEvents: Company = { ...mockCompany, companyId: 2, events: [] };

describe('CompanyCard', () => {
  it('renders the company display name', () => {
    render(<CompanyCard company={mockCompany} />);
    expect(screen.getByText('OKEA')).toBeInTheDocument();
  });

  it('renders the company ticker symbol', () => {
    render(<CompanyCard company={mockCompany} />);
    expect(screen.getByText('OKA')).toBeInTheDocument();
  });

  it('renders the company country code', () => {
    render(<CompanyCard company={mockCompany} />);
    expect(screen.getByText('NO')).toBeInTheDocument();
  });

  it('renders the company logo with descriptive alt text', () => {
    render(<CompanyCard company={mockCompany} />);
    const logo = screen.getByRole('img', { name: /OKEA/i });
    expect(logo).toBeInTheDocument();
  });

  it('renders the latest event title', () => {
    render(<CompanyCard company={mockCompany} />);
    expect(screen.getByText('Q3 2022')).toBeInTheDocument();
  });

  it('renders a formatted version of the latest event date', () => {
    render(<CompanyCard company={mockCompany} />);
    // The date "2022-10-26T08:00:00.000Z" should appear in some human-readable form
    expect(screen.getByText(/oct(ober)?\s*26[,.]?\s*2022/i)).toBeInTheDocument();
  });

  it('does not crash when the company has no events', () => {
    expect(() => render(<CompanyCard company={mockCompanyNoEvents} />)).not.toThrow();
  });

  it('does not render event information when there are no events', () => {
    render(<CompanyCard company={mockCompanyNoEvents} />);
    expect(screen.queryByText('Q3 2022')).not.toBeInTheDocument();
  });

  it('is wrapped in a listitem or article role for accessibility', () => {
    render(<CompanyCard company={mockCompany} />);
    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
  });
});
