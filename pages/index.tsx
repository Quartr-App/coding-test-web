"use client";
import { useEffect, useState } from "react";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

interface Company {
  companyId: number;
  companyName: string;
  displayName: string;
  description: string;
  iconUrl: string | null;
  logoLightUrl: string;
}

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/companies");
      const result = await response.json();
      console.log(result);
      setCompanies(result.data || []);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <main className={`${styles.container} ${inter.className}`}>
      <h1 className={styles.title}>Trending companies</h1>
      <div className={styles.companyList}>
        {companies.map((company) => (
          <div key={company.companyId} className={styles.companyCard}>
            <div className={styles.companyInfo}>
              <img 
                src={company.iconUrl || company.logoLightUrl} 
                alt={company.displayName}
                className={styles.companyLogo}
              />
              <div className={styles.companyDetails}>
                <h2 className={styles.companyName}>{company.displayName}</h2>
                <p className={styles.companyDescription}>{company.description}</p>
              </div>
            </div>
            <span className={styles.chevron}>›</span>
          </div>
        ))}
      </div>
    </main>
  );
}
