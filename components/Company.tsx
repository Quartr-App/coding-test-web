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
    const chevronClosed = (
        <svg id="chevronClosed"
            stroke='currentColor'
            fill='none'
            stroke-width='2'
            viewBox='0 0 24 24'
            stroke-linecap='round'
            stroke-linejoin='round'
            height='16'
            width='16'
            xmlns='http://www.w3.org/2000/svg'
        >
            <polyline points='6 9 12 15 18 9'></polyline>
        </svg>
    );
    const chevronOpen = (
        <svg id="chevronOpen"
            stroke='currentColor'
            fill='none'
            stroke-width='2'
            viewBox='0 0 24 24'
            stroke-linecap='round'
            stroke-linejoin='round'
            height='16'
            width='16'
            xmlns='http://www.w3.org/2000/svg'
            transform='rotate(-90)'
        >
            <polyline points='6 9 12 15 18 9'></polyline>
        </svg>
    );

    return (
        <div
            className='companyListItem'
            onClick={() => setOPen(!open)}
        >
            <div className='imageContainer'>
                <Image
                    src={"" + c.logoDarkUrl}
                    alt='Company icon'
                    width={45}
                    height={45}
                />
            </div>

            <div className='companyListItemInfo'>
                <div className='companyListItemName'>
                    {c.companyName} 
                </div>
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
                    {open ? chevronClosed : chevronOpen}
                </div>
                <div className='companyListItemdescription'>{open && c.description}</div>
            </div>
        </div>
    );
};

export { CompanyListItem };
export type { Company };
