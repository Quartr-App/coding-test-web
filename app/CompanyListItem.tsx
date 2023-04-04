import Image from "next/image";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "@/app/styles/company.module.css";
import { CompanyI } from "@/app/CompanyList";

const CompanyListItem = (company: CompanyI): JSX.Element => {
    const [open, setOPen] = useState(false);
    const chevronClosed = (
        <svg
            className={styles.chevronClosed}
            stroke='currentColor'
            fill='none'
            strokeWidth='2'
            viewBox='0 0 24 24'
            strokeLinecap='round'
            strokeLinejoin='round'
            height='16'
            width='16'
            xmlns='http://www.w3.org/2000/svg'
        >
            <polyline points='6 9 12 15 18 9'></polyline>
        </svg>
    );

    const chevronOpen = (
        <svg
            className={styles.chevronOpen}
            stroke='currentColor'
            fill='none'
            strokeWidth='2'
            viewBox='0 0 24 24'
            strokeLinecap='round'
            strokeLinejoin='round'
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
            className={styles.companyListItem}
            onClick={() => setOPen(!open)}
        >
            <div className={styles.imageContainer}>
                <Image
                    src={"" + company.logoDarkUrl}
                    alt='Company icon'
                    width={40}
                    height={40}
                />
            </div>

            <div className={styles.companyInfoBox}>
                <div className={styles.companyName}>{company.companyName}</div>
                <div className={styles.companyCountyTicker}>
                    <ReactCountryFlag
                        countryCode={company.companyCountry.toString()}
                        svg
                        style={{
                            width: "21px",
                            height: "15px",
                        }}
                    />
                    {company.companyTicker}
                    {open ? chevronClosed : chevronOpen}
                </div>
                <div className={styles.companyDescription}>{open ? company.description : ""}</div>
            </div>
        </div>
    );
};

export { CompanyListItem };
