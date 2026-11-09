export type companyType = {
  companyId: number;
  companyName: string;
  infoUrl: string;
  companyCountry: string;
  companyTicker: string;
  description: string;
  iconUrl: string;
  logoLightUrl: string;
  logoDarkUrl: string;
  events: eventType[];
};

export type eventType = {
  eventId: number;
  eventTitle: string;
  eventDate: string;
  reportUrl: string;
  pdfUrl: string;
};
