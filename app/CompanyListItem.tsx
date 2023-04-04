import Image from "next/image";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "@/app/styles/company.module.css";

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

const CompanyListItem = (c: CompanyI): JSX.Element => {
  const [open, setOPen] = useState(false);
  const chevronClosed = (
    <svg
      className={styles.chevronClosed}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
  
  const chevronOpen = (
    <svg
      className={styles.chevronOpen}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(-90)"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  return (
    <div className={styles.companyListItem} onClick={() => setOPen(!open)}>
      <div className={styles.imageContainer}>
        <Image
          src={"" + c.logoDarkUrl}
          alt="Company icon"
          width={40}
          height={40}
        />
      </div>

      <div className={styles.companyInfoBox}>
        <div className={styles.companyName}>{c.companyName}</div>
        <div className={styles.companyCountyTicker}>
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
        <div className={styles.companyDescription}>
          {open ? c.description : ""}
        </div>
      </div>
    </div>
  );
};

export { CompanyListItem };
export type { CompanyI };
