import {CompaniesData, CompanyProp, CompaniesEvents} from '../../src/interfaces'
import Link from "next/link"
import { useRouter } from "next/router"

function Companies({company} : CompanyProp) {
  return (
    <Link href={ "companies/" + company.companyId} className='company'>
      <>
      <img className='logo' src={(company.logoDarkUrl) ? company.logoDarkUrl : (company.iconUrl) ? company.iconUrl : company.logoLightUrl} />
      <div className='info'>
        <p>{company.displayName}</p>
        <span>{company.description}</span>
      </div>
      <img className='read-more' src="images/read-more-30.png" />
      </>
    </Link>
  )
}

export default Companies
