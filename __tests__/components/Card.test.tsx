import { render, screen } from "@testing-library/react";
import Card from "../../app/components/Card";
import { companyType } from "../../types/common.types";

const mockCompany: companyType = {
  companyId: 1,
  companyName: "Test Company",
  infoUrl: "https://example.com",
  companyCountry: "NO",
  companyTicker: "TEST",
  description: "Test company description",
  iconUrl: "",
  logoLightUrl: "",
  logoDarkUrl: "",
  events: [],
};

describe("Card", () => {
  it("renders the company name", () => {
    render(
      <Card
        company={mockCompany}
        isOpen={false}
        onToggle={jest.fn()}
      />
    );

    expect(screen.getByText("Test Company")).toBeInTheDocument();
  });

  it("renders the company ticker", () => {
    render(
      <Card
        company={mockCompany}
        isOpen={false}
        onToggle={jest.fn()}
      />
    );

    expect(screen.getByText("TEST")).toBeInTheDocument();
  });

  it("does not render tabs when the card is closed", () => {
    render(
      <Card
        company={mockCompany}
        isOpen={false}
        onToggle={jest.fn()}
      />
    );

    expect(screen.queryByText("Event")).not.toBeInTheDocument();
    expect(screen.queryByText("About")).not.toBeInTheDocument();
  });
});
