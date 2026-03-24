import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CompaniesList from "../../components/CompaniesList";
import { Company } from "../../types";

jest.mock("../../components/CompanyCard", () => ({
  CompanyCard: ({ company }: { company: Company }) => company.displayName,
}));

describe("CompaniesList", () => {
  it("renders an empty state when there are no companies", () => {
    render(<CompaniesList companies={[]} />);

    expect(screen.getByText("No companies found.")).toBeInTheDocument();
  });

  it("renders a CompanyCard for each company", () => {
    const companies = [
      {
        companyId: 1,
        companyCountry: "SE",
        companyName: "Acme Inc",
        companyTicker: "ACME",
        displayName: "Acme",
        logoUrl: "",
        description: "First company",
        infoUrl: "https://example.com/acme",
      },
      {
        companyId: 2,
        companyCountry: "NO",
        companyName: "Beta AS",
        companyTicker: "BETA",
        displayName: "Beta",
        logoUrl: "",
        description: "Second company",
        infoUrl: "https://example.com/beta",
      },
    ];

    render(<CompaniesList companies={companies} />);

    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });
});
