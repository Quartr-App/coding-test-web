import React from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import type { Company } from "@/app/lib/types";
import "./DetailCompany.css";

const inter = Inter({ subsets: ["latin"] });
interface DetailCompanyProps {
  company: Company;
}

export function DetailCompany({ company }: DetailCompanyProps) {
  return (
    <div className={`detail-container ${inter.className}`}>
      <div
        className="detail-card"
        style={{ borderTop: `4px solid ${company.colorSettings.brandColor}` }}
      >
        <div className="detail-header">
          <div className="header-content">
            {company.logoLightUrl && (
              <Image
                src={company.logoLightUrl}
                alt={company.displayName}
                width={48}
                height={48}
                className="company-logo"
              />
            )}
            <div>
              <h1 className="company-title">{company.displayName}</h1>
              <div className="company-meta">
                <span className="meta-item">
                  <span>🏢</span> {company.companyTicker}
                </span>
                <span className="meta-item">
                  <span>🌍</span> {company.companyCountry}
                </span>
                <span className="meta-item">
                  <span>💱</span> {company.reportingCurrency}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-content">
          <div className="content-section">
            <h2 className="section-title">About</h2>
            <p className="description">{company.description}</p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Quick Links</h2>
            <div className="quick-links">
              <a
                href={company.infoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-button"
              >
                Company Info ↗
              </a>
              <a
                href={company.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-button"
              >
                Live Data ↗
              </a>
            </div>
          </div>

          {company.events.length > 0 && (
            <div className="content-section">
              <h2 className="section-title">Events History</h2>
              <div className="events-list">
                {company.events.map((event) => (
                  <div key={event.eventId} className="event-card">
                    <a
                      href={event.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="event-title"
                    >
                      {event.eventTitle}
                    </a>
                    <div className="event-meta">
                      <span>
                        📅 {new Date(event.eventDate).toLocaleDateString()}
                      </span>
                      <span>
                        📊 {event.fiscalPeriod} {event.fiscalYear}
                      </span>
                      {event.audioUrl && (
                        <a
                          href={event.audioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="event-title"
                        >
                          🎧 Audio Recording
                        </a>
                      )}
                      {event.pdfUrl && (
                        <a
                          href={event.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="event-title"
                        >
                          📄 PDF Report
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
