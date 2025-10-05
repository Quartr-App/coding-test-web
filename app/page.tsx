"use client";

import { useEffect, useState } from "react";

import ListTitle from './components/ListTitle/ListTitle';
import ListItem  from './components/ListItem/ListItem';
import Loader from "./components/Loader/Loader";
import ErrorComponent from "./components/Error/Error";

import { CompanyData } from '../types/companyData';

export default function Home() {
  const [companyData, setCompanyData] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | { code?: number | null; message: string } | null>(null);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/companies');
      let responseData: any = null;
      try {
        responseData = await response.json();
      } catch (e) {
        responseData = null;
      }

      if (!response.ok) {
        const message = responseData?.message || responseData?.error || response.statusText || 'Request failed';
        setError({ code: response.status, message });
        setCompanyData([]);
        setLoading(false);
        return;
      }

      // Support APIs that return { data: [...] } or return the array directly
      const companyData = responseData?.data ?? responseData ?? [];
      setCompanyData(Array.isArray(companyData) ? companyData : []);
    } catch (err: any) {
      setError({ code: null, message: err?.message || 'Ooops! Something went wrong.' });
      setCompanyData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <ListTitle listTitle="Trending companies" />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorComponent message={error} onRetry={fetchData} />
      ) : (
        companyData.map((company: CompanyData) => (
          <ListItem key={company.companyId} company={company} />
        ))
      )}
    </main>
  );
}
