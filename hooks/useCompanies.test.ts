import { describe, it, expect } from "vitest"
import { StrictMode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { useCompanies } from '../hooks/useCompanies';

describe('useCompanies', () => {
  it('should fetch companies data on mount', async () => {
    const { result } = renderHook(() => useCompanies());

    // Initial state
    expect(result.current[0]).toEqual([]); // companiesData
    expect(result.current[1]).toBe(true); // fetchingCompanies
    expect(result.current[2]).toBeNull(); // errorMessage

    // Wait for fetch to complete
    await waitFor(() => {
      expect(result.current[1]).toBe(false);
    });

    // Verify data was loaded
    expect(result.current[0]).toHaveLength(5);
    expect(result.current[0][0].companyName).toBe('OKEA');
    expect(result.current[2]).toBeNull();
  });
});


