"use client";
import { useEffect, useState } from "react";
import { companyType, eventType } from "../../../types/common.types";
import AboutTab from "./aboutTab";
import CardNavigation from "./cardNavigation";
import EventTab from "./eventTab";

interface CardProps {
  company: companyType;
  isOpen: boolean;
  onToggle: () => void;
}

type CardTab = "event" | "about";

const Card = ({ company, isOpen, onToggle }: CardProps) => {
  const [activeTab, setActiveTab] = useState<CardTab>("event");
  const logoUrls = [
    company.logoDarkUrl,
    company.logoLightUrl,
    company.iconUrl,
  ].filter(Boolean);
  const [logoIndex, setLogoIndex] = useState(0);
  const currentLogo = logoUrls[logoIndex];

  useEffect(() => {
    if (!isOpen) {
      setActiveTab("event");
    }
  }, [isOpen]);

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

        <div
          className={`text-3xl text-gray-400  transition-transform duration-900 ease-in-out ${isOpen ? "rotate-90" : ""}`}
        >
          ›
        </div>
      </div>
      {isOpen && (
        <>
          <CardNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="py-4 min-h-[230px]">
            {activeTab === "event" ? (
              <EventTab company={company} />
            ) : (
              <AboutTab company={company} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
