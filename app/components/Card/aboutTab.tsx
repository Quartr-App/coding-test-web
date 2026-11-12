import { companyType } from "../../../types/common.types";

interface AboutTabProps {
  company: companyType;
}

const AboutTab = ({ company }: AboutTabProps) => {
  return (
    <div className="px-4 pb-5 pt-2">
      <p className="card-subtitle">About the company</p>
      <div className="flex flex-col justify-between rounded-lg bg-gray-50 p-4 h-[145px]">
        {company.description ? (
          <p className="card-primary-text line-clamp-3">
            {company.description}
          </p>
        ) : (
          <p>No information</p>
        )}
        <div className="py-4">
          {company.infoUrl ? (
            <a
              href={company.infoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 card-link"
            >
              Visit company website
              <img src="/icons/open_in_new.svg" alt="" className="h-4 w-4" />
            </a>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
