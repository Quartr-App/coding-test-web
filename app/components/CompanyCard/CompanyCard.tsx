'use client';

import type { Company, CompanyEvent } from '../../types/company';
import { Chevron } from '@assets/icons';
import styles from './CompanyCard.module.scss';

interface CompanyCardProps {
  company: Company;
}

function formatEventDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function LatestEvent({ event }: { event: CompanyEvent }) {
  return (
    <div className={styles.event}>
      <p className={styles.eventTitle}>
        <span>{event.eventTitle}</span>, {formatEventDate(event.eventDate)}
      </p>
    </div>
  );
}

export function CompanyCard({ company }: CompanyCardProps) {
  const { displayName, companyTicker, companyCountry, logoLightUrl, events } = company;

  const latestEvent = events[0] ?? null;

  return (
    <article className={styles.card}>
      <img
        className={styles.logo}
        src={logoLightUrl}
        alt={`${displayName} logo`}
      />

      <div className={styles.info}>
        <p className={styles.name}>{displayName}</p>

        <div className={styles.meta}>
          <p className={styles.ticker}>{companyTicker}</p>
          <p className={styles.country}>
            Origin: <span>{companyCountry}</span>
          </p>
        </div>

        {latestEvent && <LatestEvent event={latestEvent} />}
      </div>
      <Chevron />
    </article>
  );
}
