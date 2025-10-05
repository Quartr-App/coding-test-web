import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';

const company = {
  companyId: 1,
  companyName: 'IKEA AB',
  companyCountry: 'SE',
  companyTicker: 'IKEA',
  displayName: 'IKEA',
  infoUrl: 'https://example.com/info',
  liveUrl: 'https://example.com',
  logoLightUrl: null,
  logoDarkUrl: null,
  iconUrl: '/icon.png',
  reportingCurrency: 'SEK',
  colorSettings: { brandColor: null },
  description: 'Best furniture ever',
  events: [],
  isins: [],
};

describe('ListItem', () => {
  it('renders company name and description', () => {
    render(<ListItem company={company} />);
    expect(screen.getByText('IKEA AB')).toBeInTheDocument();
    expect(screen.getByText('Best furniture ever')).toBeInTheDocument();
  });

  it('renders company logo image', () => {
    render(<ListItem company={company} />);
    const img = screen.getByAltText('IKEA') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/icon.png');
  });
});
