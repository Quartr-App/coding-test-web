import { render, screen } from '@testing-library/react';
import ListTitle from './ListTitle';

describe('ListTitle', () => {
  it('renders the title text', () => {
    render(<ListTitle listTitle="Trending companies" />);
    expect(screen.getByRole('heading', { name: 'Trending companies' })).toBeInTheDocument();
  });

  it('renders the default heading level (h2)', () => {
    render(<ListTitle listTitle="Default Title" />);
    const heading = screen.getByRole('heading', { name: 'Default Title' });
    expect(heading.tagName).toBe('H2');
  });

  it('renders a custom heading level', () => {
    render(<ListTitle listTitle="Custom Title" headingLevel={4} />);
    const heading = screen.getByRole('heading', { name: 'Custom Title' });
    expect(heading.tagName).toBe('H4');
  });

  it('applies the CSS class', () => {
    render(<ListTitle listTitle="Styled Title" />);
    const heading = screen.getByRole('heading', { name: 'Styled Title' });
    expect(heading).toHaveClass('title');
  });
});