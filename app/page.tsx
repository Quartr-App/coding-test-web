"use client";

import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [companies, setCompanies] = useState<any>([]);
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data_res = await fetch("/api/companies");
      const data_json = await data_res.json();
      console.log(data_json);
      setCompanies(data_json);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <main>
      <h2 className={inter.className}>Quartr</h2>
      <p className={inter.className}>Trending companies</p>
      <ul>
        {companies.map((company: any) => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>
      <p>{JSON.stringify(companies)}</p>
    </main>
  );
}
