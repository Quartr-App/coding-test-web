import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CountryFilter, type ICompaniesResponse, type ICompany } from "../types";

export type TrendingCompaniesQueryParams = {
  country?: string;
  page?: number;
  limit?: number;
  companyId?: number;
};

const COMPANIES_API_URL = "http://localhost:8780/api/v1/companies";

const normalizeCountryParam = (country?: string) => {
  if (!country) return CountryFilter.ALL;
  return country.toUpperCase() === CountryFilter.ALL
    ? CountryFilter.ALL
    : country;
};

/**
 * Backend-driven list query: use `country/page/limit`.
 * Uses a stable `queryKey` (primitive values) to avoid infinite loading.
 */
export const FetchTrendingCompanies = (params: TrendingCompaniesQueryParams = {}) => {
  const country = normalizeCountryParam(params.country);
  const page = params.page ?? 1;
  const limit = params.limit;

  return useQuery({
    queryKey: ["FetchTrendingCompanies", country, page, limit ?? null],
    queryFn: async () => {
      const { data } = await axios.get<ICompaniesResponse>(
        `${COMPANIES_API_URL}`,
        {
          params: {
            country,
            page,
            limit,
          },
        }
      );

      return data;
    },
    retry: false,
  });
};

/** Fetch single company (including events) from backend via `companyId`. */
export const FetchCompanyById = (
  companyId: number | null,
  initialCompany?: ICompany | null
) => {
  return useQuery({
    queryKey: ["FetchCompanyById", companyId ?? null],
    enabled: typeof companyId === "number",
    initialData:
      typeof companyId === "number" && initialCompany
        ? ({ data: [initialCompany] } satisfies ICompaniesResponse)
        : undefined,
    queryFn: async () => {
      const { data } = await axios.get<ICompaniesResponse>(
        `${COMPANIES_API_URL}`,
        {
          params: {
            companyId,
          },
        }
      );

      return data;
    },
    retry: false,
  });
};

/** Build a country list from the backend dataset. */
export const FetchTrendingCountries = (limit: number = 100) => {
  return useQuery({
    queryKey: ["FetchTrendingCountries", limit],
    queryFn: async () => {
      const country = normalizeCountryParam("ALL");
      const result = await axios.get<ICompaniesResponse>(
        `${COMPANIES_API_URL}`,
        {
          params: {
            country,
            page: 1,
            limit,
          },
        }
      );

      const unique = new Set<string>();
      for (const company of result.data.data ?? []) {
        if (company.companyCountry) unique.add(company.companyCountry);
      }

      const totalPages = Math.max(1, result.data.meta?.totalPages ?? 1);
      if (totalPages > 1) {
        const remainingPages = Array.from(
          { length: totalPages - 1 },
          (_, index) => index + 2
        );

        const responses = await Promise.all(
          remainingPages.map((page) =>
            axios.get<ICompaniesResponse>(`${COMPANIES_API_URL}`, {
              params: {
                country,
                page,
                limit,
              },
            })
          )
        );
        
        for (const response of responses) {
          for (const company of response.data.data ?? []) {
            if (company.companyCountry) unique.add(company.companyCountry);
          }
        }
      }

      return Array.from(unique).sort((a, b) => a.localeCompare(b));
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

