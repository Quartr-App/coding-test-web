import { screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { mockCompanyA, mockCompanyB } from "@/testing/fixtures";
import { renderWithQuery } from "@/testing/render";
import { Home } from "./home";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => <img alt={alt} src={src} {...props} />,
}));

vi.mock("./use-trending-companies");

const { useTrendingCompanies } = await import("./use-trending-companies");

describe("Home", () => {
  it("renders the heading", () => {
    vi.mocked(useTrendingCompanies).mockReturnValue({ data: [mockCompanyA, mockCompanyB] } as never);
    renderWithQuery(<Home />);
    expect(screen.getByRole("heading", { name: "Trending companies" })).toBeInTheDocument();
  });

  it("renders a ticker for each company", () => {
    vi.mocked(useTrendingCompanies).mockReturnValue({ data: [mockCompanyA, mockCompanyB] } as never);
    renderWithQuery(<Home />);
    expect(screen.getByText("MAS")).toBeInTheDocument();
    expect(screen.getByText("MGN")).toBeInTheDocument();
  });

  it("renders a More link for each company", () => {
    vi.mocked(useTrendingCompanies).mockReturnValue({ data: [mockCompanyA, mockCompanyB] } as never);
    renderWithQuery(<Home />);
    expect(screen.getAllByRole("link", { name: "More" })).toHaveLength(2);
  });

  it("renders the company description", () => {
    vi.mocked(useTrendingCompanies).mockReturnValue({ data: [mockCompanyA] } as never);
    renderWithQuery(<Home />);
    expect(screen.getByText(mockCompanyA.description)).toBeInTheDocument();
  });

  it("renders a country flag for each company", () => {
    vi.mocked(useTrendingCompanies).mockReturnValue({ data: [mockCompanyA, mockCompanyB] } as never);
    renderWithQuery(<Home />);
    expect(screen.getAllByAltText("NO flag")).toHaveLength(2);
  });

  it("renders the empty state when there are no companies", () => {
    vi.mocked(useTrendingCompanies).mockReturnValue({ data: [] } as never);
    renderWithQuery(<Home />);
    expect(screen.getByText("No companies found.")).toBeInTheDocument();
  });
});
