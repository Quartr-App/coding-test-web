import { useState, useEffect } from "react";
import { CompanyItem, CompanyItemProps } from "../CompanyItem/CompanyItem";

// Define the types for the data that will be fetched
interface CompanyData {
  companyId: string;
  companyName: string;
  description: string;
  iconUrl?: string; // Making property optional since we cant be sure the property exist in the API
  logoDarkUrl?: string;
  logoLightUrl?: string;
  liveUrl: string;
  companyCountry: string;
  companyTicker: string;
  events: [];
}

// Define the component that will render the company data
export const CompanyItemList: React.FC = () => {
  // Initialize the state variables
  const [companyDataList, setCompanyDataList] = useState<CompanyItemProps[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the data on mount
  useEffect(() => {
    // Set loading to true while fetching
    setLoading(true);

    fetch("../api/companies") // Fetch the data from the specified URL
      .then((res) => res.json()) // Parse the JSON response
      .then((responseObject: { data: CompanyData[] }) => {
        const preparedData = prepareCompanyData(responseObject.data); // Prepare the data before setting state
        setCompanyDataList(preparedData); // Update the state with the prepared data
        setLoading(false); // Set loading to false after the data has been fetched and processed
      })
      .catch((error: Error) => {
        setLoading(false); // Set loading to false in case of an error
        setError("An error occurred while fetching company data."); // Set the error message
      });
  }, []); // Only fetch the data on mount

  // Prepare the fetched data before rendering
  const prepareCompanyData = (data: CompanyData[]): CompanyItemProps[] => {
    // Prepare the data here
    return data.map((company: CompanyData) => ({
      key: company.companyId,
      name: company.companyName,
      description: company.description,
      image: company.logoDarkUrl || company.logoLightUrl || company.iconUrl || '',
      url: company.liveUrl,
      id: company.companyId,
      country: company.companyCountry,
      ticker: company.companyTicker,
      events: company.events
    }));
  };

  // Render the component based on the state
  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message in case of an error
  }

  return (
    <ul className="company-item-list">
      {companyDataList.map((companyProps: CompanyItemProps) => (
        <CompanyItem
          key={companyProps.key}
          name={companyProps.name}
          description={companyProps.description}
          image={companyProps.image}
          url={companyProps.url}
          country={companyProps.country}
          ticker={companyProps.ticker}
          events={companyProps.events}
        />
      ))}
    </ul>
  );
};
