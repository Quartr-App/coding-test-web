export interface CompanyEvent {
  readonly eventId: number;
  readonly eventTitle: string;
  readonly eventDate: string;
  readonly fiscalPeriod: string;
  readonly fiscalYear: string;
  readonly qnaTimestamp?: number | null;
  readonly reportUrl?: string | null;
  readonly pdfUrl?: string | null;
  readonly audioUrl?: string | null;
}

export interface Company {
  readonly companyId: number;
  readonly companyName: string;
  readonly displayName: string;
  readonly companyCountry: string;
  readonly companyTicker: string;
  readonly logoLightUrl: string;
  readonly logoDarkUrl: string;
  readonly iconUrl: string | null;
  readonly infoUrl: string;
  readonly description: string;
  readonly liveUrl: string;
  readonly reportingCurrency: string;
  readonly colorSettings: Readonly<{
    brandColor: string;
  }>;
  readonly isins: readonly string[];
  readonly events: readonly CompanyEvent[];
}

export interface CompaniesResponse {
  readonly data: readonly Company[];
}
