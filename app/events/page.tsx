import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { getQueryClient } from "@/website/integrations/tanstack-query/get-query-client";
import { getEventsOptions } from "@/website/integrations/tanstack-query/query-options/events";
import { Events } from "./events";

export const metadata: Metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(getEventsOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Events />
    </HydrationBoundary>
  );
}
