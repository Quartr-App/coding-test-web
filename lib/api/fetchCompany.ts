"use client";

import { useQuery } from "@tanstack/react-query";
import { companyType } from "../../types/common.types";

const fetchCompanies = async (): Promise<companyType[]> => {
  const response = await fetch("/api/companies");
  if (!response.ok) {
    throw new Error("Failed to fetch companies data");
  }
  const result = await response.json();

  return result.data;
};

export const useCompanyData = () => {
  const query = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  });

  return {
    companyData: query.data ?? [],
    isLoading: query.isPending,
    error: query.isError ? query.error.message : null,
  };
};
