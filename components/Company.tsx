import Image from "next/image";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";

interface Company {
    companyId: Number;
    companyName: String;
    companyCountry: String;
    companyTicker: String;
    displayName: String;
    infoUrl: String;
    liveUrl: String;
    logoLightUrl: String;
    logoDarkUrl: String;
    iconUrl: string;
    description: String;
    reportingCurrency: String;
    colorSettings: {
        brandColor: String;
    };
}

const CompanyListItem = (c: Company): JSX.Element => {
    const [open, setOPen] = useState(false);

    return (
        <div
            className='companyListItem'
            onClick={() => setOPen(!open)}
        >
            <div className='imageContainer' >
                <Image
                    src={"" + c.logoDarkUrl}
                    alt='Company icon'
                    width={45}
                    height={45} 
                />
            </div>

            <div className='companyListItemInfo'>
                <div className='companyListItemName'>{c.companyName}</div>
                <div className='companyListItemCountyTicker'>
                    <ReactCountryFlag
                        countryCode={c.companyCountry.toString()}
                        svg
                        style={{
                            width: "21px",
                            height: "15px",
                        }}
                    />
                    {c.companyTicker}
                </div>
                <div className='companyListItemdescription'>{open && c.description}</div>
            </div>
        </div>
    );
};

export { CompanyListItem };
export type { Company };
