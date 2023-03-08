import Image from "next/image";

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
    const imagePath = "";

    console.log(c.iconUrl);

    return (
        <div>
            <Image
                src={"" + c.logoLightUrl}
                alt='Company icon'
                width={50}
                height={50}
            />
            {c.companyName}
            {c.companyTicker}
            {c.companyCountry}
            {c.description}
        </div>
    );
};

export { CompanyListItem };
export type { Company };
