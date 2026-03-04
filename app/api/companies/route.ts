import { allCompanies } from "@/app/api/mock-data";

export async function GET() {
  return Response.json(allCompanies, {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
