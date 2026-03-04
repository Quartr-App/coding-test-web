import { queryOptions } from "@tanstack/react-query";
import type { Company } from "@/app/api/mock-data";
import { getEventsQueryKey } from "@/website/integrations/tanstack-query/query-keys/events";
import { env } from "@/website/utils/env";

export function getEventsOptions() {
  return queryOptions({
    queryFn: async (): Promise<Company[]> => {
      const response = await fetch(`${env.nextPublicBaseUrl}/api/events`);
      return response.json();
    },
    queryKey: getEventsQueryKey(),
  });
}
