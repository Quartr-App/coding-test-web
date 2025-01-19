import { Company } from "./types";

/**
 * get list of available companies
 * can be used in showcase companoes
 *
 */
export function listOfCompanies(companies: Company[]): number {
  return companies.length;
}
/**
 * Used for checking if this is an detail page
 * can be used for displaying home button
 *
 */
export const isCompanyDetailRoute = (pathname: string | null): boolean => {
  if (!pathname) {
    return false;
  }

  return /^\/companies\/\d+$/.test(pathname);
};
/**
 * Gets a company by ID from a list of companies
 * Returns undefined if company doesn't exist
 *
 */
export function getCompanyById(companies: Company[], companyId: number) {
  return companies.find((company) => company.companyId === companyId);
}
/**
 * Formats a date string to DD/MM/YYYY format
 * can be used for consistent date display across the application
 *
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}
/**
 * Creates a delay for the specified duration (defaults to 1000ms)
 * can be used to simulate network latency or loading states
 *
 */
export function delay(ms = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
