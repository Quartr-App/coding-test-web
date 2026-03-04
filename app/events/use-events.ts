import { useSuspenseQuery } from "@tanstack/react-query";
import { getEventsOptions } from "@/website/integrations/tanstack-query/query-options/events";

export function useEvents() {
  return useSuspenseQuery(getEventsOptions());
}
