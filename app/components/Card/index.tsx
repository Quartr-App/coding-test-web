import { useState } from "react";
import { companyType, eventType } from "../../../types/common.types";
import EventTab from "./eventTab";

interface CardProps {
  company: companyType;
  isOpen: boolean;
  onToggle: () => void;
}

const Card = ({ company, isOpen, onToggle }: CardProps) => {
  const logoUrls = [
    company.logoDarkUrl,
    company.logoLightUrl,
    company.iconUrl,
  ].filter(Boolean);
  const [logoIndex, setLogoIndex] = useState(0);
  const currentLogo = logoUrls[logoIndex];

  const latestEvent = [...(company.events ?? [])].sort(
    (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime(),
  )[0];

  return (
    <div className="border-b border-gray-200">
      <div
        onClick={onToggle}
        className="flex gap-2 items-center justify-between py-4"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
            {currentLogo ? (
              <img
                src={currentLogo}
                alt={`${company.companyName} logo`}
                className="h-full w-full object-contain"
                onError={() => {
                  setLogoIndex((prev) => prev + 1);
                }}
              />
            ) : (
              <img
                src="/icons/corporate_icon.svg"
                alt="Default company logo"
                className="h-10 w-10"
              />
            )}
          </div>

          <div className="flex flex-col gap-1 w-[90%]">
            <p className="card-title">{company.companyName}</p>
            <div className="flex items-center gap-2">
              <img
                src={`https://flagcdn.com/${company.companyCountry.toLowerCase()}.svg`}
                alt={`${company.companyCountry} flag`}
                className="h-4 w-4 object-contain"
              />
              <p className="card-secondary-text">{company.companyTicker}</p>
            </div>
          </div>
        </div>

        <div className="text-3xl text-gray-400">›</div>
      </div>
      {isOpen && (
        <>
          <EventTab company={company} />
        </>
      )}
    </div>
  );
};

export default Card;
