export interface CompaniesEvents {
  reportUrl: string;
  pdfUrl: string;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  qnaTimestamp: number;
  fiscalPeriod: string;
  fiscalYear: string;
}

export interface CompanyProp {
  companyId: number;
  companyName: string;
  companyCountry: string;
  companyTicker: string;
  displayName: string;
  infoUrl: string;
  liveUrl: string;
  logoLightUrl: string;
  logoDarkUrl: string;
  iconUrl: string;
  description: string;
  reportingCurrency: string;
  colorSettings: {
    brandColor: string;
  };
  events: [CompaniesEvents];
  isins: [];
}

export interface CompaniesData {
  data: [CompanyProp];
}
