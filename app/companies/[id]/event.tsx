import { CompaniesEvents } from "../../../src/interfaces";
import Link from "next/link";
import { isColorDark } from "../../../src/functions";
import CalendarIcon from "../../../public/icons/calendar.svg";

function Event({ event, brandColor }: { event: CompaniesEvents; brandColor: string }) {
  const calendarIcon = () => <CalendarIcon />;
  const attendHandler = (e: React.MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement }) => {
    if (e.target.innerHTML.toLowerCase() === "attend") {
      e.target.innerHTML = "Going";
    } else {
      e.target.innerHTML = "Attend";
    }
  };

  let date: Date = new Date(event.eventDate);
  let displayDate: string = date.toLocaleString("en-us", { month: "long" }) + " " + date.getDay() + ", " + date.getFullYear() + " - " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  let eventPassed: boolean = Date.now() - date.getTime() > 0 ? true : false;
  let darkBrandColor: boolean = isColorDark(brandColor);
  brandColor = brandColor != "#ffffff" ? brandColor : "#333";

  return (
    <>
      <h3>{event.eventTitle}</h3>
      <span>
        <span className='icon' style={{ color: brandColor }}>
          {calendarIcon()}
        </span>
        {displayDate}
      </span>
      <div className='footer'>
        {!eventPassed ? ( // Show the presentation button if it is an old event
          <Link href={event.pdfUrl} style={{ backgroundColor: brandColor }} className={"presentation " + (darkBrandColor ? "dark" : "light")}>
            Presentation
          </Link>
        ) : (
          <button type='button' style={{ backgroundColor: brandColor }} className={"attend " + (darkBrandColor ? "dark" : "light")} onMouseUp={attendHandler}>
            Attend
          </button>
        )}
        <Link href={event.reportUrl} style={{ backgroundColor: "#333" }} className='buy-ticket'>
          Download Document
        </Link>
      </div>
    </>
  );
}

export default Event;
