import { Inter } from '@next/font/google';
import { CompanyList } from './components/CompanyList';
import { CompaniesResponse } from '../types/company';
const inter = Inter({ subsets: ['latin'] });

async function getData(): Promise<CompaniesResponse> {
  const response = await fetch('http://localhost:3000/api/companies');
  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }
  return response.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <main>
      <h3 className={`${inter.className} text-gray-500 font-normal`}>
        Trending companies
      </h3>
      <CompanyList companies={data} />
    </main>
  );
}
