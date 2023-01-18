export interface CompaniesEvents {
  reportUrl: string,
  pdfUrl: string,
  eventId: number,
  eventTitle: string,
  eventDate: string,
  qnaTimestamp: number,
  fiscalPeriod: string,
  fiscalYear: string,
}

export interface CompaniesData {
data: [
{
  companyId: number,
  companyName: string,
  companyCountry: string,
  companyTicker: string,
  displayName: string,
  infoUrl: string,
  liveUrl: string,
  logoLightUrl: string,
  logoDarkUrl: string,
  iconUrl: string,
  description: string,
  reportingCurrency: string,
  colorSettings: {
    brandColor: string,
  },
  events: [CompaniesEvents],
  isins: [],
}
]
}


export interface CompanyProp {
  company: {
  companyId: number,
  companyName: string,
  companyCountry: string,
  companyTicker: string,
  displayName: string,
  infoUrl: string,
  liveUrl: string,
  logoLightUrl: string,
  logoDarkUrl: string,
  iconUrl: string,
  description: string,
  reportingCurrency: string,
  colorSettings: {
    brandColor: string,
  },
  events: [CompaniesEvents],
  isins: []
}
}
