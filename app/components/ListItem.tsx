import { Chevron } from "./Chevron";
import "./ListItem.css";

interface ListItemProps {
  title: string;
  description: string;
  darkImageUrl: string;
  lightImageUrl: string;
}

export function ListItem({
  title,
  description,
  darkImageUrl,
  lightImageUrl,
}: ListItemProps) {
  return (
    <li className="list-item">
      <img src={darkImageUrl} alt={title} data-theme="dark" />
      <img src={lightImageUrl} alt={title} data-theme="light" />
      <div className="info">
        <p className="title">{title}</p>
        <p className="description">{description}</p>
      </div>
      <Chevron />
    </li>
  );
}
