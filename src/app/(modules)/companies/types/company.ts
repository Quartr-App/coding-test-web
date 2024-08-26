interface ColorSettings {
  brandColor: string
}

interface Event {
  reportUrl: string
  pdfUrl: string | null
  eventId: number
  eventTitle: string
  eventDate: string
  qnaTimestamp: string | null
  fiscalPeriod: string
  fiscalYear: string
}

type CompanyLocale = "NO" | "FI"

export interface Company {
  companyId: number
  companyName: string
  companyCountry: CompanyLocale
  companyTicker: string
  displayName: string
  infoUrl: string
  liveUrl: string
  logoLightUrl: string
  logoDarkUrl: string
  iconUrl: string
  description: string
  reportingCurrency: string
  colorSettings: ColorSettings
  events: Event[]
  isins: unknown[]
}

export interface CompanyCellProps {
  company: Company
}
