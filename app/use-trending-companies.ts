import { useSuspenseQuery } from "@tanstack/react-query";
import { getTrendingCompaniesOptions } from "@/website/integrations/tanstack-query/query-options/companies";

export function useTrendingCompanies() {
  return useSuspenseQuery(getTrendingCompaniesOptions());
}
