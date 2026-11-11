import { fireEvent, render, screen } from "@testing-library/react";
import Dashboard from "../../app/components/Dashboard";
import { useCompanyData } from "../../lib/api/fetchCompany";
import { companyType } from "../../types/common.types";

jest.mock("../../lib/api/fetchCompany", () => ({
  useCompanyData: jest.fn(),
}));

const mockUseCompanyData = jest.mocked(useCompanyData);

const companies: companyType[] = [
  {
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
  },
  {
    companyId: 2,
    companyName: "Another Company",
    infoUrl: "https://another.example.com",
    companyCountry: "SE",
    companyTicker: "OTHER",
    description: "Another company description",
    iconUrl: "",
    logoLightUrl: "",
    logoDarkUrl: "",
    events: [],
  },
];

describe("Dashboard", () => {
  beforeEach(() => {
    mockUseCompanyData.mockReset();
  });

  it("shows skeleton cards while loading", () => {
    mockUseCompanyData.mockReturnValue({
      companyData: [],
      isLoading: true,
      error: null,
    });

    const { container } = render(<Dashboard />);

    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(
      0,
    );
  });

  it("shows an error message when loading fails", () => {
    mockUseCompanyData.mockReturnValue({
      companyData: [],
      isLoading: false,
      error: "Failed to fetch companies data",
    });

    render(<Dashboard />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Failed to fetch companies data",
    );
  });

  it("renders companies and opens the selected company's tabs", () => {
    mockUseCompanyData.mockReturnValue({
      companyData: companies,
      isLoading: false,
      error: null,
    });

    render(<Dashboard />);

    expect(screen.getByText("Trending companies")).toBeInTheDocument();
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("Another Company")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "EVENT" })).toBeNull();

    fireEvent.click(screen.getByText("Test Company"));

    expect(screen.getByRole("button", { name: "EVENT" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ABOUT" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "ABOUT" }));
    expect(screen.getByText("Test company description")).toBeInTheDocument();
    expect(screen.queryByText("Another company description")).toBeNull();
  });
});
