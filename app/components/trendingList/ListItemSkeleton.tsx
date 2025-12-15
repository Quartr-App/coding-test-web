import { Chevron } from "../Chevron";
import "./ListItemSkeleton.css";

export function ListItemSkeleton() {
  return (
    <li className="skeleton-list-item">
      <div className="skeleton-img">
        <div className="skeleton"></div>
      </div>
      <div className="info">
        <div className="title">
          <div className="skeleton"></div>
        </div>
        <div className="description">
          <div className="skeleton"></div>
        </div>
      </div>
      <Chevron />
    </li>
  );
}
