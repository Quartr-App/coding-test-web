export interface ICompanyEvent {
  eventId: number;
  eventTitle: string;
  eventDate: string;
  fiscalPeriod: string;
  fiscalYear: string;
  qnaTimestamp: number | null;
  reportUrl?: string;
  pdfUrl?: string | null;
  audioUrl?: string | null;
}

export interface ICompany {
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
  brandColor: string | null;
  events: ICompanyEvent[];
  isins: string[];
}

export interface ICompaniesResponse {
  data: ICompany[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ITrendingCompaniesPage {
  countries: string[];
  selectedCountry: string;
  onCountryChange: (next: string) => void;

  isLoading: boolean;
  error: string | null;

  companies: ICompany[];
  filteredCompaniesLength: number;

  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;

  companyId: number | null;
  onToggleCompany: (companyId: number) => void;
  onCloseCompany: () => void;

  company: ICompany | null;
  latestEvent: ICompanyEvent | null;

  isEventsOpen: boolean;
  sortedEvents: ICompanyEvent[];
  eventsPage: number;
  totalEventPages: number;
  onEventsPageChange: (nextPage: number) => void;
  onOpenAllEvents: () => void;
  onCloseAllEvents: () => void;

  docUrl: string | null;
  docTitle: string;
  docZoom: number;
  onDocZoomChange: (nextZoom: number) => void;
  onCloseDoc: () => void;
  onOpenDocPreview: (url: string, title: string) => void;
}


export interface IEventDocs {
  reportUrl?: string;
  pdfUrl?: string;
  audioUrl?: string;
  label: string;
};

export enum CountryFilter {
  ALL = "ALL",
  NO = "NO",
  FI = "FI",
  SE = "SE",
  US = "US",
}

