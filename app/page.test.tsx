import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from './page';
import { data as mockData } from '../data/data';

// use real data from data/data.ts
const company = mockData.data[0];

describe('Home page integration', () => {
  beforeEach(() => {
    // ensure a fresh mock
    (global as any).fetch = jest.fn();
  });

  it('renders companies on successful fetch', async () => {
    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [company] }),
    });

    render(<Home />);

    expect(await screen.findByText(company.companyName)).toBeInTheDocument();
  });

  it('shows error on failed fetch and recovers after retry', async () => {
    (global as any).fetch
      // first call: error
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ error: 'Internal Server Error' }),
      })
      // second call (retry): success
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [company] }),
      });

    render(<Home />);

    // Error alert should appear
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/internal server error/i);

    // Click retry
    const retry = screen.getByRole('button', { name: /retry fetching data/i });
    fireEvent.click(retry);

    // Loader appears
    expect(screen.getByRole('status', { name: /loading companies/i })).toBeInTheDocument();

    // After retry resolves the company is rendered
    expect(await screen.findByText(company.companyName)).toBeInTheDocument();
  });
});
