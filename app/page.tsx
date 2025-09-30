"use client";

import { useEffect, useState } from "react";

import ListTitle from './components/ListTitle/ListTitle';
import ListItem  from './components/ListItem/ListItem';
import Loader from "./components/Loader/Loader";
import Error from "./components/Error/Error";

import { CompanyData } from '../types/companyData';

export default function Home() {
  const [companyData, setCompanyData] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const responseData = await fetch("/api/companies");
        const companyData = await responseData.json();
        setCompanyData(companyData.data);
      } catch (error: any) {
        setError(error.message || "Ooops! Something went wrong.");
        setCompanyData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <ListTitle listTitle="Trending companies" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        companyData.map((company: CompanyData) => (
          <ListItem key={company.companyId} company={company} />
        ))
      )}
    </main>
  );
}
