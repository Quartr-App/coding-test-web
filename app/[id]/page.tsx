import { Inter } from '@next/font/google';
import { Company } from '../../types/company';
const inter = Inter({ subsets: ['latin'] });

async function getData(id: string): Promise<Company> {
  const response = await fetch(`http://localhost:3000/api/companies/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch company');
  }
  return response.json();
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getData(id);
  return (
    <main>
      <h3 className={`${inter.className} text-xl font-bold`}>
        {data.companyName}
      </h3>
      <p className={`${inter.className} text-gray-500 font-normal`}>
        {data.description}
      </p>
    </main>
  );
}
