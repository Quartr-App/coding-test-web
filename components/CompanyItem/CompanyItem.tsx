import { useState } from "react";
import { BsChevronUp } from "react-icons/bs";
import "./CompanyItem.css";

// Defines the props interface for CompanyItem component
export interface CompanyItemProps {
  key: string;
  name: string;
  description: string;
  image: string;
  url: string;
  ticker: string;
  country: string;
  events: Event[]; // events prop is an array of Event objects
}

// Defines the interface for each Event object
interface Event {
  reportUrl: string;
  pdfUrl: string;
  eventId: string;
  eventDate: string;
  qnaTimestamp: string;
  fiscalPeriod: string;
  fiscalYear: string;
}

// Defines the CompanyItem component
export const CompanyItem = (props: CompanyItemProps) => {
  // Defines state for slideout open/closed status using useState hook
  const [isSlideoutOpen, setIsSlideoutOpen] = useState(false);

  // Handles slideout click event and toggles isSlideoutOpen state
  function handleSlideoutClick(): void {
    setIsSlideoutOpen(!isSlideoutOpen);
  }

  return (
    <li className="list-item">
      <section className="company-item" onClick={handleSlideoutClick}>
        <img src={props.image} width="50" alt={`${props.name} logo`} />
        <section className="company-item__info">
          <h2 className="company-item__company-name">{props.name}</h2>
          <p className={`company-item__description ${isSlideoutOpen ? "open" : ""}`}>{props.description}</p>
        </section>
          <BsChevronUp className={`company-item__chevron ${isSlideoutOpen ? "open" : "section"}`}/>

      </section>
      <section
        className={`company-item__slideout ${isSlideoutOpen ? "open" : ""}`}
      >
        {/* Loops through each event and renders its details */}
        {props.events.map((event: Event) => (
          <section className="company-item__slideout-content" key={event.eventId}>
            <section className="company-item__column">
              <p className="company-item__headline">Country</p>
              <p>{props.country}</p>
            </section>
            <section className="company-item__column">
              <p className="company-item__headline">Ticker</p>
              <p>{props.ticker}</p>
            </section>
            <section className="company-item__column">
              <p className="company-item__headline">Release Date</p>
              <p>{event.eventDate.substring(0, 10)}</p>
            </section>
            <section className="company-item__column">
              <p className="company-item__headline">Period</p>
              <p>{event.fiscalPeriod}</p>
            </section>
            <section className="company-item__column">
              <p className="company-item__headline">Year</p>
              <p>{event.fiscalYear}</p>
            </section>
              <a className="company-item__link company-item__link--pdf" href={event.pdfUrl} target="_blank">
                View PDF
              </a>
              <a className="company-item__link company-item__link--report" href={event.reportUrl} target="_blank">
                View Report
              </a>
          </section>
        ))}
      </section>
    </li>
  );
};
