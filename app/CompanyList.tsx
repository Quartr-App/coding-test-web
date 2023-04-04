import React from "react";
import { CompanyI, CompanyListItem } from "./CompanyListItem";

interface CompanyListProps {
    companies: CompanyI[];
}

const CompanyList = ({ companies }: CompanyListProps) => {
    return (
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
    );
};

export default CompanyList;
