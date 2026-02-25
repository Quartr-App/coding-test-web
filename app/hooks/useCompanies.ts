'use client';

import { useState, useEffect } from 'react';
import type { Company } from '../types/company';

interface UseCompaniesResult {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
}

export function useCompanies(): UseCompaniesResult {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/companies');

        if (!response.ok) {
          throw new Error(`Failed to fetch companies: ${response.status}`);
        }

        const { data } = await response.json();
        setCompanies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, isLoading, error };
}
