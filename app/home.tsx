"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { CountryFlag } from "@/components/flag";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { List } from "@/components/list";
import { Strong } from "@/components/text";
import { getCompanyOptions } from "@/website/integrations/tanstack-query/query-options/companies";
import { getImageSize } from "@/website/utils/get-image-size";
import type { Company } from "./api/mock-data";
import { useTrendingCompanies } from "./use-trending-companies";

export function Home() {
  const queryClient = useQueryClient();
  const { data: trendingCompanies } = useTrendingCompanies();

  const handleMouseEnter = useCallback(
    (companyId: number) => {
      queryClient.prefetchQuery({ ...getCompanyOptions(`${companyId}`), staleTime: 60000 });
    },
    [queryClient],
  );

  return (
    <div className="mx-auto max-w-6xl">
      <Heading>Trending companies</Heading>
      <Divider className="my-6" />
      {trendingCompanies.length === 0 ? (
        <Strong aria-live="polite">No companies found.</Strong>
      ) : (
        <List items={trendingCompanies}>
          {trendingCompanies.map(
            (
              { companyId, logoDarkUrl, companyTicker, description, displayName, companyCountry }: Company,
              index: number,
            ) => (
              <List.Item
                className="grid grid-cols-[auto_1fr_auto] gap-3 items-center"
                divider={index < trendingCompanies.length - 1 ? "soft" : undefined}
                key={companyId}
                onMouseEnter={() => handleMouseEnter(companyId)}
              >
                <Link href={`/companies/${companyId}`}>
                  <List.ItemImage
                    alt=""
                    className="rounded-lg shadow-sm aspect-square block-auto inline-auto outline-none"
                    src={logoDarkUrl}
                    {...getImageSize({ aspectRatio: "1x1", width: 48 })}
                  />
                </Link>
                <div className="space-y-1">
                  <Link href={`/companies/${companyId}`}>
                    <List.ItemTitle className="inline">{companyTicker}</List.ItemTitle>
                  </Link>
                  <div className="flex items-center gap-1">
                    <List.ItemDetails>{displayName}</List.ItemDetails>
                    <span aria-hidden="true">·</span>
                    <CountryFlag countryCode={companyCountry} />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button href={`/companies/${companyId}`}>More</Button>
                </div>
                <List.ItemDetails className="line-clamp-1 col-span-2">{description}</List.ItemDetails>
              </List.Item>
            ),
          )}
        </List>
      )}
    </div>
  );
}
