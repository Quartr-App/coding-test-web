export interface CompanyEvent {
  eventId: number;
  eventTitle: string;
  eventDate: string;
  fiscalPeriod: string;
  fiscalYear: string;
  reportUrl: string;
  pdfUrl: string | null;
  qnaTimestamp: number | null;
  audioUrl?: string | null;
}

export interface Company {
  companyId: number;
  companyName: string;
  companyCountry: string;
  companyTicker: string;
  displayName: string;
  infoUrl: string;
  liveUrl: string;
  logoLightUrl: string;
  logoDarkUrl: string;
  iconUrl: string | null;
  description: string;
  reportingCurrency: string;
  colorSettings: {
    brandColor: string;
  };
  events: CompanyEvent[];
  isins: string[];
}

export interface CompaniesApiResponse {
  data: Company[];
}
