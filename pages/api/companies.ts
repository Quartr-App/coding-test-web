// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Company, Event, ColorSettings } from "@/type";

import companies from '@/data/companies.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  res.status(200).json(companies.map(c => ({
    id: c.companyId,
    name: c.companyName,
    displayName: c.displayName,
    country: c.companyCountry,
    ticker: c.companyTicker,
    description: c.description,
    iconUrl: c.iconUrl,
    infoUrl: c.infoUrl,
    liveUrl: c.liveUrl,
    logoDarkUrl: c.logoDarkUrl,
    logoLightUrl: c.logoLightUrl,
    currency: c.reportingCurrency,
    isins: c.isins,
    settings: { brand: c.colorSettings.brandColor } as ColorSettings,
    events: c.events.map(e => ({
      id: e.eventId,
      title: e.eventTitle,
      date: new Date(e.eventDate),
      fiscalPeriod: e.fiscalPeriod,
      fiscalYear: e.fiscalYear,
      pdfUrl: e.pdfUrl,
      qnaTimestamp: e.qnaTimestamp,
      reportUrl: e.reportUrl,
      audioUrl: e.audioUrl,
    } as Event)),
  } as Company)));
}
