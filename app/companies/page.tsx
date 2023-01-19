"use client";
import useSWR from "swr";
import { CompaniesData } from "../../src/interfaces";
import { getCompanies } from "../../src/fetcher";
import Company from "./Company";

const Companies = () => {
  const { isValidating, data, error } = useSWR<CompaniesData, Error>("/api/companies", getCompanies);
  if (!isValidating && error) {
    return <div>Something wrong happened.</div>;
  }

  // When is is loaded
  if (!isValidating && data) {
    return (
      <section className='container trending-companies'>
        <h4>Trending companies</h4>
        {data.data.map((company) => {
          return <Company company={company} key={company.companyId}></Company>;
        })}
      </section>
    );
  }
};

export default Companies;
