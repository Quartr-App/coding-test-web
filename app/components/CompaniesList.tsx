import { getCompanies } from "@/server/companies";
import { CompanyItem } from "./CompanyItem";

export async function CompaniesList() {
  const { data: companies } = await getCompanies();

  if (companies.length === 0) {
    return (
      <p role="status" className="py-6 text-gray-500">
        No companies found.
      </p>
    );
  }

  return (
    <ul role="list" className="space-y-6">
      {companies.map((company) => (
        <li key={company.companyId}>
          <CompanyItem company={company} />
        </li>
      ))}
    </ul>
  );
}
