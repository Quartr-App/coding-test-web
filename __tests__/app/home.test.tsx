import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react';
import Home from '@/app/page';

import companies from '@/data/companies.json';

describe('Home', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(companies.map(c => ({ ...c, id: c.companyId }))),
      }),
    ) as jest.Mock;
  });
  it('renders company list', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByText('Trending companies')).toBeInTheDocument()
  });  
});
