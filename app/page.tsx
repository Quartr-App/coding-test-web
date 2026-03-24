import CompaniesList from "../components/CompaniesList";
import { getCompanies } from "../lib/companies/companies";

export default function Home() {
  const companies = getCompanies();

  return (
    <main className="mt-10">
      <h1 className="text-4xl font-bold font-sans">Quartr</h1>
      <section aria-labelledby="trending-companies">
        <h2 id="trending-companies" className="text-2xl mt-10 font-sans">
          Trending companies
        </h2>
        <CompaniesList companies={companies} />
      </section>
    </main>
  );
}
