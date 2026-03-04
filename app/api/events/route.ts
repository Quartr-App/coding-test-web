import { allCompanies, type CompanyEvent } from "@/app/api/mock-data";

export async function GET() {
  const events = allCompanies.reduce<(CompanyEvent & { companyId: number; companyName: string })[]>((acc, company) => {
    const { companyId, companyName, events } = company;
    const companyEvents = events.map((event) => ({
      ...event,
      companyId,
      companyName,
    }));
    acc.push(...companyEvents);
    return acc;
  }, []);

  return Response.json(events, {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
