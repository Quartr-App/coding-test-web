import React, { useEffect, useState } from "react";
import { CompanyListItem } from "./CompanyListItem";
import ErrorComponent from "./error";
import LoadingSkeleton from "./LoadingSkeleton";

interface CompanyI {
    companyId: number;
    companyName: string;
    companyCountry: string;
    companyTicker: string;
    displayName: string;
    infoUrl: string;
    liveUrl: string;
    logoLightUrl: string;
    logoDarkUrl: string;
    iconUrl: string;
    description: string;
    reportingCurrency: string;
    colorSettings: {
      brandColor: string;
    };
  }

interface data_jsonI {
    data: CompanyI[];
}

const CompanyList = () => {
    const [companies, setCompanies] = useState<CompanyI[]>([]);
    const [fetching, setFetching] = useState<boolean>(true);
    const [data_res_status, setdata_res_status] = useState<number>(500);

    useEffect(() => {
        const fetchData = async () => {
            setFetching(true);
            try {
                const data_res = await fetch("/api/companies");

                if (data_res.status !== 200) {
                    setdata_res_status(500);
                } else if (data_res.status === 200) {
                    const data_json: data_jsonI = await data_res.json();
                    setCompanies(data_json.data);
                    setdata_res_status(200);
                }
            } catch (error) {
                setdata_res_status(500);
            }
            setFetching(false);
        };

        fetchData();
    }, []);

    return (
        <>
            {fetching ? (
                <LoadingSkeleton />
            ) : data_res_status != 200 ? (
                <ErrorComponent />
            ) : (
                <div className='companyList'>
                    {companies.map((company: CompanyI) => (
                        <CompanyListItem
                            key={company.companyId}
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
            )}
        </>
    );
};

export default CompanyList;
export type { CompanyI };