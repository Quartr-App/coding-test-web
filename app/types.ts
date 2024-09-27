// These types can be imported in case they are to be used by several components

type ColorSettings = {
  brandColor: string;
};

type Events = {
  eventDate: string;
  eventId: number;
  eventTitle: string;
  fiscalPeriod: string;
  fiscalYear: string;
  pdfUrl: string;
  qnaTimestamp: number;
  reportUrl: string;
};

export type Company = {
  colorSettings: ColorSettings;
  companyCountry: string;
  companyId: number;
  companyName: string;
  companyTicker: string;
  description: string;
  displayName: string;
  events: Events[];
  iconUrl: string;
  infoUrl: string;
  isins: [];
  liveUrl: string;
  logoDarkUrl: string;
  logoLightUrl: string;
  reportingCurrency: string;
};
