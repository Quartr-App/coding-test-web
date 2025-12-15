import { useCallback, useEffect, useRef, useState } from "react";
import type { TrendingCompany } from "../../pages/api/companies";

export function useTrending() {
  const [companies, setCompanies] = useState<TrendingCompany[]>([]);

  const [loading, setLoading] = useState<boolean>(true); // assume loading is true initially
  const [error, setError] = useState<Error | undefined>(undefined);
  const hasTried = useRef(false);

  const fetchTrendingCompanies = useCallback(async () => {
    setLoading(true); // noop if already loading
    try {
      const response = await fetch("/api/companies");
      if (!response.ok) {
        throw new Error("Failed to fetch trending companies");
      }
      const data = await response.json();
      setCompanies(data.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);
  // Ideally, loading and error states would be managed by a fetching caching layer like React Query

  useEffect(() => {
    if (hasTried.current) return;
    hasTried.current = true;
    fetchTrendingCompanies();
  });

  return {
    companies,
    loading,
    error,
  };
}
