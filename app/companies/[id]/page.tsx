import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQueryClient } from "@/website/integrations/tanstack-query/get-query-client";
import { getCompanyOptions } from "@/website/integrations/tanstack-query/query-options/companies";
import { Company } from "./company";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  try {
    const { id } = await params;
    const queryClient = getQueryClient();
    const { companyName } = await queryClient.fetchQuery(getCompanyOptions(id));
    return {
      title: `Company - ${companyName}`,
    };
  } catch {
    notFound();
  }
};

export default async function CompanyPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(getCompanyOptions(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Company />
    </HydrationBoundary>
  );
}
