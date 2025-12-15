import type { TrendingCompany } from "../../../pages/api/companies";
import { Chevron } from "../Chevron";
import "./ListItem.css";

interface ListItemProps {
  company: TrendingCompany;
}

export function ListItem({ company }: ListItemProps) {
  return (
    <li className="list-item">
      <img
        src={company.logoDarkUrl}
        alt={company.displayName}
        data-theme="dark"
      />
      <img
        src={company.logoLightUrl}
        alt={company.displayName}
        data-theme="light"
      />
      <div className="info">
        <p className="title">{company.displayName}</p>
        <p className="description">{company.description}</p>
      </div>
      <Chevron />
    </li>
  );
}
