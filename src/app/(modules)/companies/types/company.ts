import { ColorSettings, CompanyLocale } from "@/companies/types"

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
  colorSettings: ColorSettings | undefined
  events: Event[]
  isins: unknown[]
}
