import { allCompanies } from "@/app/api/mock-data";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return Response.json(undefined, { status: 400 });
  }
  const company = allCompanies.find(({ companyId }) => companyId === Number(id));
  if (!company) {
    return Response.json(undefined, { status: 404 });
  }
  return Response.json(company, {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
