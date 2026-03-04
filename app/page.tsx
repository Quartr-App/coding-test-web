import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { getQueryClient } from "@/website/integrations/tanstack-query/get-query-client";
import { getTrendingCompaniesOptions } from "@/website/integrations/tanstack-query/query-options/companies";
import { Home } from "./home";

export const metadata: Metadata = {
  title: "Home | Quartr",
};

export default function HomePage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getTrendingCompaniesOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
}
