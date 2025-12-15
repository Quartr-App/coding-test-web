import type { TrendingCompany } from "../../pages/api/companies";
import { useRequest } from "./useRequest";

export function useTrending() {
  const { data, loading, error } = useRequest<{ data: TrendingCompany[] }>(
    "/api/companies"
  );

  return {
    companies: data?.data,
    loading,
    error,
  };
}
