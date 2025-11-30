"use client";
import type { Company } from "@/type";

// Could add fonts in the layout to avoid duplication,
// unless we want to customise styles on pages
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

import CompaniesList from "../components/company-list";

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [dataError, setDataError] = useState<string>('');
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      try {
        const response = await fetch("/api/companies");
        const responseData = await response.json();
        setCompanies(responseData);
        setDataError('');
      } catch (error) {
        console.error(error);
        setDataError('Error getting data from the server');
      }
    };

    fetchData();
  }, []);

  return (
    <main className="p-10">
      <h2 className={inter.className}>Quartr</h2>
      <p className={inter.className}>Trending companies</p>
      {dataError ? (
        <p className="text-red-400">{dataError}</p>
      ): null}
      <CompaniesList companies={companies} />
    </main>
  );
}
