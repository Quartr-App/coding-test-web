import type { FC } from 'react';
import type { Company } from '@/type';

import CompanyItem from './company-item';

type Props = {
  companies: Company[];
};
const CompanyList: FC<Props> = ({ companies }) => {
  return (
    <div className="h-screen w-full">
      <div className="mx-auto w-full">
        {companies.map(company => <CompanyItem key={company.id} company={company} />)}
      </div>
    </div>
  )
}

export default CompanyList;
