import { Company } from "../types";
import { CompanyCard } from "./CompanyCard";

interface CompaniesListProps {
  companies: Company[];
}

export default function CompaniesList({ companies }: CompaniesListProps) {
  if (companies.length === 0) {
    return <p className="">No companies found.</p>;
  }
  return (
    <ul className="divide-y divide-gray-200 mb-10">
      {companies.map((company) => (
        <li key={company.companyId}>
          <CompanyCard company={company} />
        </li>
      ))}
    </ul>
  );
}
