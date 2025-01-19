import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { formatDate } from "@/app/lib/helpers";
import type { Company } from "@/app/lib/types";
import "./CompanyList.css";

const inter = Inter({ subsets: ["latin"] });

interface CompanyListProps {
  companies: Company[];
}

export function CompanyList({ companies }: CompanyListProps) {
  return (
    <div className={`companies-container ${inter.className}`}>
      <h1 className="companies-title">Companies</h1>
      <div className="companies-grid">
        {companies.map((company) => (
          <div
            key={company.companyId}
            className="company-card"
            style={{
              borderTop: `4px solid ${company.colorSettings.brandColor}`,
            }}
          >
            <div className="company-content">
              <div className="company-header">
                {company.logoLightUrl && (
                  <img
                    src={company.logoLightUrl}
                    alt={company.displayName}
                    className="company-logo"
                  />
                )}
                <div>
                  <h2 className="company-name" data-testid="company-name">
                    {company.displayName}
                  </h2>
                  <div className="company-ticker">
                    <span className="icon">🏢</span>
                    <span>{company.companyTicker}</span>
                  </div>
                </div>
              </div>

              <p className="company-description">{company.description}</p>

              <div className="company-info">
                <div className="info-item">
                  <span className="icon">🌍</span>
                  <span>{company.companyCountry}</span>
                </div>
                {company.events.length > 0 && (
                  <div className="info-item">
                    <span className="icon">📅</span>
                    <span>
                      Latest event:{" "}
                      {company.events[0]?.eventDate
                        ? formatDate(company.events[0].eventDate)
                        : ""}
                    </span>
                  </div>
                )}
              </div>

              <div className="company-links">
                <Link
                  href={`/companies/${company.companyId}`}
                  className="link-button"
                  prefetch={true}
                >
                  Show Detail ↗
                </Link>
              </div>
            </div>

            {company.events.length > 0 && (
              <div className="events-section">
                <h3 className="events-title">Latest Events</h3>
                <div className="event-list">
                  {company.events.slice(0, 2).map((event) => (
                    <div key={event.eventId} className="event-item">
                      <a
                        href={event.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="event-link"
                      >
                        {event.eventTitle}
                      </a>
                      <div className="event-date">
                        {formatDate(event.eventDate)} - {event.fiscalPeriod}{" "}
                        {event.fiscalYear}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
