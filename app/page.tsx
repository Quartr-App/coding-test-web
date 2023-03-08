"use client";

import { Inter } from "@next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

import { Company, CompanyListItem } from "./Company";

export default function Home() {
    const [companies, setCompanies] = useState<Company[]>([]);
    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const data_res = await fetch("/api/companies");
            const data_json = await data_res.json();
            console.log(data_json.data);
            setCompanies(data_json.data);
        };

        // call the function
        fetchData().catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <main>
            <h2 className={inter.className}>Quartr</h2>
            <p className={inter.className}>Trending companies</p>
            <div>
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
