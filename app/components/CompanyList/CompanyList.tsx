'use client';

import { useCompanies } from '@hooks/useCompanies';
import { CompanyCard } from '@components/CompanyCard/CompanyCard';
import styles from './CompanyList.module.scss';

export function CompanyList() {
  const { companies, isLoading, error } = useCompanies();

  if (isLoading) {
    return (
      <div
        role="status"
        className={styles.loading}
      >
        Loading companies…
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className={styles.error}
      >
        {error}
      </div>
    );
  }

  if (companies.length === 0) {
    return <p className={styles.empty}>No companies found.</p>;
  }

  return (
    <ul className={styles.list}>
      <p>Trending companies</p>
      {companies.map(company => (
        <li key={company.companyId}>
          <CompanyCard company={company} />
        </li>
      ))}
    </ul>
  );
}
