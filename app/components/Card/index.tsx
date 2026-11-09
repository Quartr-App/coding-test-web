import { useState } from "react";

interface CardProps {
  name: string;
  description: string;
  iconUrl: string;
  logoLightUrl: string;
  logoDarkUrl: string;
  isOpen: boolean;
  onToggle: () => void;
}

const Card = ({
  name,
  description,
  iconUrl,
  logoLightUrl,
  logoDarkUrl,
  isOpen,
  onToggle,
}: CardProps) => {
  const logoUrls = [logoDarkUrl, logoLightUrl, iconUrl].filter(Boolean);
  const [logoIndex, setLogoIndex] = useState(0);
  const currentLogo = logoUrls[logoIndex];

  return (
    <>
      <div
        onClick={onToggle}
        className="flex gap-2 items-center justify-between border-b border-gray-200 py-4"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
            {currentLogo ? (
              <img
                src={currentLogo}
                alt={`${name} logo`}
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
            <p className="company-title">{name}</p>
            <p className="company-description">
              {description.length > 20
                ? `${description.slice(0, 100)}...`
                : description}
            </p>
          </div>
        </div>

        <div className="text-3xl text-gray-400">›</div>
      </div>
      {isOpen && (
        <div>
          <p>Latest event</p>
          <p>{}</p>
        </div>
      )}
    </>
  );
};

export default Card;
