import type { Company, CompanyEvent } from "@/app/api/mock-data";

export const mockEventWithPdf: CompanyEvent = {
  audioUrl: null,
  eventDate: "2022-11-15T09:00:00.000Z",
  eventId: 47085,
  eventTitle: "Q3 2022",
  fiscalPeriod: "Q3",
  fiscalYear: "2022",
  pdfUrl: "https://files.quartr.com/conference-calls/17883.pdf",
  qnaTimestamp: null,
  reportUrl: "https://files.quartr.com/reports/f600c.pdf",
};

export const mockEventNoPdf: CompanyEvent = {
  ...mockEventWithPdf,
  eventId: 47032,
  pdfUrl: null,
};

export const mockFlatEvent = {
  ...mockEventWithPdf,
  companyId: 2,
  companyName: "Måsøval",
};

export const mockCompanyA: Company = {
  colorSettings: { brandColor: "#d96d23" },
  companyCountry: "NO",
  companyId: 2,
  companyName: "Måsøval",
  companyTicker: "MAS",
  description:
    "Måsøval AS is a Norwegian aquaculture company that focuses on the production and marketing of farmed salmon.",
  displayName: "Måsøval",
  events: [],
  iconUrl: null,
  infoUrl: "https://www.masoval.no/",
  isins: [],
  liveUrl: "https://en.masoval.no/investor",
  logoDarkUrl: "https://files.quartr.com/company-logos/1276e-2022-12-14-05-25-34.png",
  logoLightUrl: "https://files.quartr.com/company-logos/afb7a-2022-12-14-05-25-34.png",
  reportingCurrency: "NOK",
};

export const mockCompanyB: Company = {
  colorSettings: { brandColor: "#3c8ab4" },
  companyCountry: "NO",
  companyId: 3,
  companyName: "Magnora",
  companyTicker: "MGN",
  description: "Magnora ASA operates as a renewable energy development company.",
  displayName: "Magnora",
  events: [],
  iconUrl: null,
  infoUrl: "https://magnoraasa.com/",
  isins: [],
  liveUrl: "https://magnoraasa.com/investors/",
  logoDarkUrl: "https://files.quartr.com/company-logos/f4ae3-2022-12-14-05-23-20.png",
  logoLightUrl: "https://files.quartr.com/company-logos/1577c-2022-12-14-05-23-20.png",
  reportingCurrency: "NOK",
};
