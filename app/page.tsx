"use client";

import { useEffect, useState } from "react";
import { Company, CompanyListItem } from "app/Company";

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data_res = await fetch("/api/companies");
      const data_json = await data_res.json();
      console.log(data_json.data);
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
        {companies.map((company: Company) => (
          <CompanyListItem
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
