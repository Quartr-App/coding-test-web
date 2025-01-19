import { NextResponse } from "next/server";
import { COMPANIES } from "@/app/lib/mock";
import { Company } from "@/app/lib/types";
import { delay, getCompanyById } from "@/app/lib/helpers";

/**
 * Retrieves all companies from the database.
 * Includes a simulated network delay for realistic behavior.
 *
 */
export async function fetchAllCompanies(): Promise<NextResponse<Company[]>> {
  await delay();

  return NextResponse.json(COMPANIES);
}
/**
 * Retrieves a specific company by its unique identifier.
 * Includes a simulated network delay for realistic behavior.
 *
 */
export async function fetchCompanyById(
  id: string
): Promise<NextResponse<Company | null>> {
  try {
    await delay(800);

    const company = getCompanyById(COMPANIES, Number(id));

    if (!company) {
      return NextResponse.json(null);
    }

    return NextResponse.json(company);
  } catch (error) {
    throw new Error(`Failed to fetch company with ID ${id}`);
  }
}
