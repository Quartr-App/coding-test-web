import { companiesRawData } from "./mock-companies";
import { Company } from "../../types";
import { normalizeCompanies } from "./normalize-companies";

export function getCompanies(): Company[] {
  return normalizeCompanies(companiesRawData);
}
