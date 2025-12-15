import { TrendingCompany } from "../../pages/api/companies";
import { ListItem } from "./ListItem";

export function TrendingList({ companies }: { companies: TrendingCompany[] }) {
  return (
    <ul>
      {companies.map((company) => (
        <ListItem
          key={company.companyId}
          title={company.displayName}
          description={company.description}
          darkImageUrl={company.logoDarkUrl}
          lightImageUrl={company.logoLightUrl}
        />
      ))}
    </ul>
  );
}
