export type companyType = {
  companyId: number;
  companyName: string;
  infoUrl: string | null;
  companyCountry: string;
  companyTicker: string;
  description: string | null;
  iconUrl: string | null;
  logoLightUrl:  string | null;
  logoDarkUrl:  string | null;
  events: eventType[] | null;
};

export type eventType = {
  eventId: number | null;
  eventTitle: string | null;
  eventDate:  string | null;
  reportUrl:  string | null;
  pdfUrl:  string | null;
};
