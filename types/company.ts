export interface Company {
  companyId: number;
  companyName: string;
  companyCountry: string;
  companyTicker: string;
  displayName: string;
  logoUrl: string;
  description: string;
  infoUrl: string;
}

export interface CompanyRawData {
  companyId?: number | null;
  companyName?: string | null;
  companyCountry?: string | null;
  companyTicker?: string | null;
  displayName?: string | null;
  logoLightUrl?: string | null;
  logoDarkUrl?: string | null;
  iconUrl?: string | null;
  description?: string | null;
  reportingCurrency?: string | null;
  events?: {
    reportUrl?: string | null;
    pdfUrl?: string | null;
    eventId?: number | null;
    eventTitle?: string | null;
    eventDate?: string | null;
    qnaTimestamp?: number | null;
    fiscalPeriod?: string | null;
    fiscalYear?: string | null;
    audioUrl?: string | null;
  }[];
  isins?: string[];
  colorSettings?: {
    brandColor?: string | null;
  };
  infoUrl?: string | null;
  liveUrl?: string | null;
}

export interface RawCompaniesResponse {
  data: CompanyRawData[];
}
