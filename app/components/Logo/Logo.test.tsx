import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

describe('Logo', () => {
  it('renders an image with text from displayName', () => {
    render(<Logo displayName="Sparbanken" />);
    const img = screen.getByAltText('Sparbanken') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/favicon.ico');
  });

  it('uses provided iconUrl when available', () => {
    render(<Logo displayName="Ikea" iconUrl="/icon.png" />);
    const img = screen.getByAltText('Ikea') as HTMLImageElement;
    expect(img.src).toContain('/icon.png');
  });
});
