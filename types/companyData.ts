export interface CompanyData {
  companyId: number
  companyName: string
  companyCountry: string
  companyTicker: string
  displayName: string 
  infoUrl: string
  liveUrl: string
  logoLightUrl: string | null
  logoDarkUrl: string | null
  iconUrl: string | null
  reportingCurrency: string
  colorSettings: colorSettings
  description: string
  events: Array<Event>
  isins: Array<string>
}

interface Event {
    reportUrl: string | null
    pdfUrl: string | null
    eventId: number
    eventTitle: string
    eventDate: string
    qnaTimestamp: number | null
    fiscalPeriod: string | null
    fiscalYear: string | null
}

interface colorSettings {
    brandColor: string | null}
