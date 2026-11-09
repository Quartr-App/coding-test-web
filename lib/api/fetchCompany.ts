"use client";

import { useEffect, useState } from "react";
import { companyType } from "../../types/common.types";

export const useCompanyData = () => {
  const [companyData, setCompanyData] = useState<companyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/companies");
        if (!response.ok) {
          throw new Error("Failed to fetch companies data");
        }
        const result = await response.json();
        setCompanyData(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    // call the function
    fetchData();
    // make sure to catch any error
  }, []);
  return { companyData, isLoading, error };
};
