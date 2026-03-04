import { queryOptions } from "@tanstack/react-query";
import type { CompanyEvent } from "@/app/api/mock-data";
import { getEventsQueryKey } from "@/website/integrations/tanstack-query/query-keys/events";
import { env } from "@/website/utils/env";

export function getEventsOptions() {
  return queryOptions({
    queryFn: async (): Promise<(CompanyEvent & { companyId: number; companyName: string })[]> => {
      const response = await fetch(`${env.nextPublicBaseUrl}/api/events`);
      return response.json();
    },
    queryKey: getEventsQueryKey(),
  });
}
