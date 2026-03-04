import { queryOptions } from "@tanstack/react-query";
import type { Company } from "@/app/api/mock-data";
import {
  getCompanyQueryKey,
  getTrendingCompaniesQueryKey,
} from "@/website/integrations/tanstack-query/query-keys/companies";
import { env } from "@/website/utils/env";

export function getTrendingCompaniesOptions() {
  return queryOptions({
    queryFn: async (): Promise<Company[]> => {
      const response = await fetch(`${env.nextPublicBaseUrl}/api/companies`);
      return response.json();
    },
    queryKey: getTrendingCompaniesQueryKey(),
  });
}

export function getCompanyOptions(companyId: string) {
  return queryOptions({
    queryFn: async (): Promise<Company> => {
      const response = await fetch(`${env.nextPublicBaseUrl}/api/companies/${companyId}`);
      return response.json();
    },
    queryKey: getCompanyQueryKey(companyId),
  });
}
