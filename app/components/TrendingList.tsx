import { TrendingCompany } from "../../pages/api/companies";
import { ListItem } from "./ListItem";
import { ListItemSkeleton } from "./ListItemSkeleton";

interface TrendingListProps {
  companies: TrendingCompany[];
  showLoading: boolean;
}

const skeletonList = (
  <ul aria-busy="true" aria-live="polite">
    <ListItemSkeleton />
    <ListItemSkeleton />
    <ListItemSkeleton />
    <ListItemSkeleton />
    <ListItemSkeleton />
  </ul>
);

export function TrendingList({ companies, showLoading }: TrendingListProps) {
  if (showLoading) return skeletonList;

  return (
    <ul>
      {companies.map((company) => (
        <ListItem key={company.companyId} company={company} />
      ))}
    </ul>
  );
}
