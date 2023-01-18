"use client"
import useSWR from 'swr'
import {CompaniesData} from '../../../src/interfaces'
import {getCompanies} from '../../../src/fetcher'

function page({params}: any) {
  const { id } = params;

  const { isValidating, data, error } = useSWR<CompaniesData, Error>("/api/companies", getCompanies);
  if (!isValidating &&  error) {
    return (
      <div>Something wrong happened.</div>
    )
  }

  // When is is loaded
  if (!isValidating && data) {
  return data.data.filter(selectedCompany => selectedCompany.companyId == id).map(company => {
    return (
      <section className='company-details' key={company.companyId}>
        <img className='logo' src={(company.logoDarkUrl) ? company.logoDarkUrl : (company.iconUrl) ? company.iconUrl : company.logoLightUrl} />
        <article className='details'>
          <h1>{company.displayName}</h1>
          <p>{company.description}</p>
        </article>
        <div className="event">

        </div>
      </section>
    )
  })
  }
}

export default page



