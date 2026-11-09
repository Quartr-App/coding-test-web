"use client";
import { companyType } from "../../../types/common.types";
import { formatDateString } from "../../../utils/date";
import { checkPdf } from "../../../lib/api/checkPdf";
import { useEffect, useState } from "react";

interface CardProps {
  company: companyType;
}

const EventTab = ({ company }: CardProps) => {
  const latestEvent = [...(company.events ?? [])].sort(
    (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime(),
  )[0];

  const [validReport, setValidReport] = useState(false);
  const [validPdf, setValidPdf] = useState(false);

  useEffect(() => {
    if (!latestEvent) return;

    const checkLinks = async () => {
      const [report, pdf] = await Promise.all([
        latestEvent.reportUrl ? checkPdf(latestEvent.reportUrl) : false,
        latestEvent.pdfUrl ? checkPdf(latestEvent.pdfUrl) : false,
      ]);

      setValidReport(report);
      setValidPdf(pdf);
    };

    checkLinks();
  }, [latestEvent]);

  return (
    <div className="border-b border-gray-200 px-4 pb-5 pt-2">
      {latestEvent ? (
        <>
          <p className="card-subtitle">Latest event</p>
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="border-b border-gray-400 pb-2">
              <p className="card-event-title">{latestEvent.eventTitle}</p>
              <p className="card-date">
                {formatDateString(latestEvent.eventDate)}
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-3 ">
              {validReport && (
                <a
                  href={latestEvent.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 card-link"
                >
                  Annual / Interim Report
                  <img src="/icons/open_in_new.svg" className="h-4 w-4" />
                </a>
              )}

              {validPdf && (
                <a
                  href={latestEvent.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 card-link"
                >
                  Presentation PDF
                  <img src="/icons/open_in_new.svg" className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500">No events available.</p>
      )}
    </div>
  );
};

export default EventTab;
