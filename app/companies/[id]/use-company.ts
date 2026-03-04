import { useSuspenseQuery } from "@tanstack/react-query";
import { getCompanyOptions } from "@/website/integrations/tanstack-query/query-options/companies";

export function useCompany(id: string) {
  return useSuspenseQuery(getCompanyOptions(id));
}
