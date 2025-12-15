import { useCallback, useEffect, useRef, useState } from "react";

type RequestResult<T> =
  | { data: T; loading: false; error: undefined }
  | { data: undefined; loading: true; error: undefined }
  | { data: undefined; loading: false; error: Error };

export function useRequest<T>(url: string): RequestResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(true); // assume loading is true initially
  const [error, setError] = useState<Error | undefined>(undefined);
  const hasTried = useRef(false);

  const fetchTrendingCompanies = useCallback(async () => {
    setLoading(true); // noop if already loading
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch trending companies");
      }
      const data = await response.json();
      setData(data);
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

  switch (true) {
    case loading:
      return { data: undefined, loading: true, error: undefined };
    case error !== undefined:
      return { data: undefined, loading: false, error };
    default:
      return { data: data as T, loading: false, error: undefined };
  }
}
