import Image from "next/image";
import { Company } from "../types";

interface CompanyCardProps {
  company: Company;
}

function CompanyCardContent({ company }: { company: Company }) {
  const isClickable = Boolean(company.infoUrl);
  return (
    <>
      <div className="flex min-w-0 items-center gap-3">
        <CompanyCardLogo
          logoUrl={company.logoUrl}
          displayName={company.displayName}
        />
        <CompanyCardInfo
          displayName={company.displayName}
          companyTicker={company.companyTicker}
          companyCountry={company.companyCountry}
          description={company.description}
        />
      </div>
      <CompanyCardChevron isClickable={isClickable} />
    </>
  );
}

function CompanyCardLogo({
  logoUrl,
  displayName,
}: {
  logoUrl: string;
  displayName: string;
}) {
  return logoUrl ? (
    <div className="bg-gray-200 p-1 rounded-lg ">
      <Image
        src={logoUrl}
        alt={`${displayName} logo`}
        width={48}
        height={48}
        className="h-16 w-16 object-contain"
      />
    </div>
  ) : (
    <div className="bg-gray-200 p-1 rounded-lg ">
      <div className="flex h-16 w-16 items-center justify-center text-gray-600">
        {displayName}
      </div>
    </div>
  );
}

function CompanyCardInfo({
  displayName,
  companyTicker,
  companyCountry,
  description,
}: {
  displayName: string;
  companyTicker: string;
  companyCountry: string;
  description: string;
}) {
  return (
    <div className="flex flex-col w-2/3">
      <div className="flex flex-row">
        <h3 className="text-lg font-semibold">{displayName}</h3>
        <span className="ml-2 rounded-full border border-gray-200 bg-gray-600 px-2 py-1.5 text-[10px] text-white">
          {companyTicker} · {companyCountry}
        </span>
      </div>
      <p className="text-sm text-gray-500 truncate">{description}</p>
    </div>
  );
}

function CompanyCardChevron({ isClickable }: { isClickable: boolean }) {
  if (!isClickable) {
    return null;
  }
  return (
    <span aria-hidden="true" className="shrink-0 text-gray-400">
      &rsaquo;
    </span>
  );
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <article className="flex items-center justify-between gap-4 rounded-lg py-4 hover:shadow-md hover:shadow-gray-200">
      {company.infoUrl ? (
        <a
          href={company.infoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer w-full flex items-center justify-between"
        >
          <CompanyCardContent company={company} />
        </a>
      ) : (
        <CompanyCardContent company={company} />
      )}
    </article>
  );
}
