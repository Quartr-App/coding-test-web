import Image from "next/image";
import Link from "next/link";
import { Company } from "@/server/companies";

export function CompanyItem({
  company: { companyId, logoDarkUrl, displayName, description },
}: {
  company: Company;
}) {
  const titleId = `company-${companyId}-title`;
  const descriptionId = `company-${companyId}-description`;

  return (
    <Link
      href="/"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="flex flex-col border-b pb-6 border-b-gray-200 sm:flex-row text-center sm:text-left sm:items-center"
    >
      <div className="relative h-20 sm:w-40">
        <Image
          className="object-contain"
          fill
          src={logoDarkUrl}
          alt={displayName}
          aria-hidden="true"
        />
      </div>
      <div className="mt-6 sm:flex-1 sm:mt-0 sm:ml-4">
        <h3 id={titleId} className="text-lg font-semibold mb-4">
          {displayName}
        </h3>
        <p
          id={descriptionId}
          className="text-gray-500 line-clamp-3 sm:line-clamp-2"
        >
          {description}
        </p>
      </div>
      <div
        aria-hidden="true"
        className="w-10 text-2xl text-gray-400 ml-8 hidden sm:block"
      >
        &rsaquo;
      </div>
    </Link>
  );
}
