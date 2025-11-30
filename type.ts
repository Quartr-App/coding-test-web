export type ColorSettings = {
  brand: string;
};
export type Event = {
  id: number;
  title: string;
  date: Date;
  fiscalPeriod: string;
  fiscalYear: string;
  pdfUrl?: string;
  qnaTimestamp?: number;
  reportUrl: string;
  audioUrl?: string;
};
export type Company = {
  id: number;
  name: string;
  displayName: string;
  country: string;
  ticker: string;
  description: string;
  iconUrl?: string;
  infoUrl: string;
  liveUrl: string;
  logoDarkUrl: string;
  logoLightUrl: string;
  currency: string;
  isins: unknown[];
  settings: ColorSettings;
  events: Event[];
};
