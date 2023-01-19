"use client";
import useSWR from "swr";
import { CompaniesData } from "../../../src/interfaces";
import { getCompanies } from "../../../src/fetcher";
import Event from "./event";

function Page({ params }: any) {
  const { id } = params;
  const { isValidating, data, error } = useSWR<CompaniesData, Error>("/api/companies", getCompanies);

  if (!isValidating && error) {
    return <div>Something wrong happened.</div>;
  }

  // When data is loaded
  if (!isValidating && data) {
    return data.data
      .filter((selectedCompany) => selectedCompany.companyId == id)
      .map((company) => {
        return (
          <section className='company-details' key={company.companyId}>
            <div className='container top'>
              <h2 className='title'>{company.displayName}</h2>
              <img className='logo' src={company.logoDarkUrl ? company.logoDarkUrl : company.iconUrl ? company.iconUrl : company.logoLightUrl} />
            </div>
            <div className='container main'>
              <article className='details'>
                <h4>About the company</h4>
                <p>{company.description}</p>
              </article>
              <div className='event'>
                {company.events.map((event) => {
                  return <Event event={event} brandColor={company.colorSettings.brandColor} key={event.eventId}></Event>;
                })}
              </div>
            </div>
          </section>
        );
      });
  }
}

export default Page;
