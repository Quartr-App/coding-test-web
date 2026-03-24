import { companiesRawData } from "../../../lib/companies/mock-companies";
import { RawCompaniesResponse } from "../../../types/company";
import { NextResponse } from "next/server";

export async function GET() {
  const response: RawCompaniesResponse = {
    data: companiesRawData,
  };

  return NextResponse.json(response);
}
