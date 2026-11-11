import { render, screen } from "@testing-library/react";
import AboutTab from "../../app/components/Card/aboutTab";
import { companyType } from "../../types/common.types";

const company: companyType = {
  companyId: 1,
  companyName: "Test Company",
  infoUrl: "https://example.com",
  companyCountry: "NO",
  companyTicker: "TEST",
  description: "A company used in the About tab test.",
  iconUrl: "",
  logoLightUrl: "",
  logoDarkUrl: "",
  events: [],
};

describe("AboutTab", () => {
  it("shows the company description and website link", () => {
    render(<AboutTab company={company} />);

    expect(
      screen.getByText("A company used in the About tab test."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Visit company website" }),
    ).toHaveAttribute("href", "https://example.com");
  });
});
