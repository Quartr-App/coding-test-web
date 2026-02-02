export type TrendingCompanyEventSeed = {
  eventId: number;
  eventTitle: string;
  eventDate: string;
  reportUrl: string | null;
  pdfUrl: string | null;
  audioUrl?: string | null;
  qnaTimestamp: number | null;
  fiscalPeriod: string | null;
  fiscalYear: string | null;
};

export type TrendingCompaniesSeed = {
  companyId: number;
  companyName: string;
  companyCountry: string;
  companyTicker: string;
  displayName: string;
  infoUrl: string | null;
  liveUrl: string | null;
  logoLightUrl: string | null;
  logoDarkUrl: string | null;
  iconUrl: string | null;
  description: string | null;
  reportingCurrency: string | null;
  brandColor: string | null;
  events: TrendingCompanyEventSeed[];
  isins: string[];
};
