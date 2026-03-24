import { Company, CompanyRawData } from "../../types";
import { capitalizeFirst } from "../utils";

function getCompanyLogoUrl(company: CompanyRawData): string {
  return (
    company.logoLightUrl?.trim() ||
    company.logoDarkUrl?.trim() ||
    company.iconUrl?.trim() ||
    ""
  );
}

function getCompanyDisplayName(company: CompanyRawData): string {
  const displayName =
    company.displayName?.trim() || company.companyName?.trim() || "";

  return capitalizeFirst(displayName);
}

export function normalizeCompanies(
  companiesRawData: CompanyRawData[],
): Company[] {
  return companiesRawData
    .map((company) => {
      if (typeof company.companyId !== "number") {
        return null;
      }

      const displayName = getCompanyDisplayName(company);
      if (!displayName) {
        return null;
      }

      return {
        companyId: company.companyId,
        companyCountry: company.companyCountry?.trim() ?? "",
        companyName: company.companyName?.trim() ?? "",
        companyTicker: company.companyTicker?.trim() ?? "",
        displayName,
        logoUrl: getCompanyLogoUrl(company),
        description: company.description?.trim() ?? "",
        infoUrl: company.infoUrl?.trim() ?? "",
      };
    })
    .filter((company): company is Company => company !== null);
}
