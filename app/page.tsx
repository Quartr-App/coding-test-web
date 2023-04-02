"use client";

import { useEffect, useState } from "react";
import { CompanyI, CompanyListItem } from "app/Company";

export default function Home() {
  const [companies, setCompanies] = useState<CompanyI[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data_res = await fetch("/api/companies");
      const data_json = await data_res.json();
      
      setCompanies(data_json.data);
    };

    fetchData().catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <main>
      <h1>Quartr</h1>
      <h2>Trending companies</h2>
      <div className="companyList">
        {companies.map((company: CompanyI) => (
          <CompanyListItem key={company.companyId}
            companyId={company.companyId}
            companyName={company.companyName}
            companyCountry={company.companyCountry}
            companyTicker={company.companyTicker}
            displayName={company.displayName}
            infoUrl={company.infoUrl}
            liveUrl={company.liveUrl}
            logoLightUrl={company.logoLightUrl}
            logoDarkUrl={company.logoDarkUrl}
            iconUrl={company.iconUrl}
            description={company.description}
            reportingCurrency={company.reportingCurrency}
            colorSettings={company.colorSettings}
          />
        ))}
      </div>
    </main>
  );
}
