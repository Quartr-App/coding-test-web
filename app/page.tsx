"use client";
import React from "react";
// import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import { Company } from "./types";
import Image from "next/image";

// const inter = Inter({ subsets: ["latin"] }); // @next/font/google failed to run when testing with Jest

const Page: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      setLoading(true);

      const data = await fetch("/api/companies")
        .then((res) => res.json())
        .then((data2) => {
          setLoading(false);
          setCompanies(data2.data);
        })
        .catch((e) => {
          console.error("Error: ", e);
          setError(true);
        });
    };

    // call the function
    fetchData();
  }, []);

  // For better feedback to user
  if (loading) {
    return <p id="loadingOrError">Loading...</p>;
  }

  if (error) {
    return <p id="loadingOrError">{error}</p>;
  }

  return (
    <main>
      <header>
        <a href="https://quartr.com">
          <h1>Quartr</h1>
        </a>
      </header>

      <h2>Trending companies</h2>
      {companies?.map((company) => {
        const isExpanded = selectedCompanyId === company.companyId;

        return (
          <div
            id="wrapper"
            key={company.companyId}
            className={isExpanded ? "expanded" : ""}
            aria-expanded={isExpanded}
            onClick={() => setSelectedCompanyId(company.companyId)}
          >
            <div id="titleRow">
              <Image
                src={company?.logoDarkUrl}
                width={60} //overrided by CSS
                height={25} //overrided by CSS
                alt={company.companyName}
              />
              <div id="companyInfo">
                <p>{company.displayName}</p>
                <p id="description" className={isExpanded ? "expanded" : ""}>
                  {company.description}
                </p>
              </div>
            </div>

            {/* If lots of information to show, put in another component for readability */}
            <div id="company">
              {isExpanded && (
                <>
                  <p>Live URL: {company.liveUrl}</p>
                  <p>Info URL: {company.infoUrl}</p>
                  <p>Reporting currency: {company.reportingCurrency}</p>
                  <p>Company ticker: {company.companyTicker}</p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </main>
  );
};
export default Page;
