import { render, screen } from "@testing-library/react";
import { CompanyItem } from "@/components/CompanyItem";
import { buildCompany } from "__test__/helpers";

describe("CompanyItem", () => {
  test("accessible name", () => {
    const company = buildCompany({ displayName: "OKEA" });

    render(<CompanyItem company={company} />);

    expect(screen.getByRole("link", { name: "OKEA" })).toBeInTheDocument();
  });

  test("href uses liveUrl", () => {
    const company = buildCompany({
      displayName: "Atria",
      liveUrl: "https://atria.example/live",
    });

    render(<CompanyItem company={company} />);

    const link = screen.getByRole("link", { name: "Atria" });
    expect(link).toHaveAttribute("href", "https://atria.example/live");
  });
});
