import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CompanyCard } from "../../components/CompanyCard";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe("CompanyCard", () => {
  const company = {
    companyId: 1,
    companyCountry: "SE",
    companyName: "Acme Inc",
    companyTicker: "ACME",
    displayName: "Acme",
    logoUrl: "https://example.com/logo.png",
    description: "Test company description",
    infoUrl: "https://example.com",
  };

  it("renders the company display name", () => {
    render(<CompanyCard company={company} />);

    expect(screen.getByRole("heading", { name: "Acme" })).toBeInTheDocument();
  });

  it("renders the company ticker and country", () => {
    render(<CompanyCard company={company} />);

    expect(screen.getByText("ACME · SE")).toBeInTheDocument();
  });

  it("renders the company description", () => {
    render(<CompanyCard company={company} />);

    expect(screen.getByText("Test company description")).toBeInTheDocument();
  });

  it("renders the company link with the correct href", () => {
    render(<CompanyCard company={company} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });

  it("renders the company logo when logoUrl exists", () => {
    render(<CompanyCard company={company} />);

    expect(screen.getByRole("img", { name: "Acme logo" })).toBeInTheDocument();
  });

  it("does not render an image when logoUrl is missing", () => {
    render(
      <CompanyCard
        company={{
          ...company,
          logoUrl: "",
        }}
      />,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
