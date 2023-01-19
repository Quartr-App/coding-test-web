import { CompanyProp } from "../../src/interfaces";
import Link from "next/link";

function Company({ company }: { company: CompanyProp}) {
  return (
    <Link href={"companies/" + company.companyId} className='company'>
      <>
        <img className='logo' src={company.logoDarkUrl ? company.logoDarkUrl : company.iconUrl ? company.iconUrl : company.logoLightUrl} />
        <div className='info'>
          <p>{company.displayName}</p>
          <span>{company.description}</span>
        </div>
        <img className='read-more' src='icons/read-more-30.png' />
      </>
    </Link>
  );
}

export default Company;
