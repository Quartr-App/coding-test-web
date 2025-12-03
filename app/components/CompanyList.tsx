import { Inter } from '@next/font/google';
import { CompaniesResponse, Company } from '../../types/company';
import { ChevronRight } from './ChevronRight';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export function CompanyList({ companies }: { companies: CompaniesResponse }) {
  return (
    <ul>
      {companies?.data?.map((company: Company) => (
        <li
          key={company.companyId}
          className={`${inter.className} h-16 flex flex-row items-center gap-4 p-3 border-b border-gray-300 border-solid justify-between`}
          aria-label={`Company ${company.displayName}`}
        >
          <div className='flex flex-row items-center gap-4 overflow-hidden'>
            <div className='rounded-lg h-10 w-10 min-w-10 flex items-center justify-center'>
              <img
                src={company.logoDarkUrl}
                alt={company.companyName}
                width={40}
                height={40}
                aria-label={`Logo for ${company.displayName}`}
              />
            </div>
            <div className='flex flex-col gap-1 overflow-hidden'>
              <span aria-hidden='true'>{company.displayName}</span>
              <span className='text-gray-500 text-sm font-normal truncate'>
                {company.description}
              </span>
            </div>
          </div>
          <Link
            href={`/${company.companyId}`}
            className='hover:opacity-80 transition-opacity duration-300 min-h-16 min-w-16 flex items-center justify-center'
            aria-label={`View details for ${company.displayName}`}
          >
            <ChevronRight className='w-6 h-6 min-w-6 min-h-6' />
          </Link>
        </li>
      ))}
    </ul>
  );
}
