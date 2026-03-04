import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { mockCompanyA, mockEventNoPdf, mockEventWithPdf } from "@/testing/fixtures";
import { renderWithQuery } from "@/testing/render";
import { Company } from "./company";

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

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
  useParams: vi.fn(() => ({ id: String(mockCompanyA.companyId) })),
}));

vi.mock("./use-company");

const { useCompany } = await import("./use-company");

describe("Company", () => {
  it("renders the company name as a heading", () => {
    vi.mocked(useCompany).mockReturnValue({ data: mockCompanyA } as never);
    renderWithQuery(<Company />);
    expect(screen.getByRole("heading", { name: mockCompanyA.companyName })).toBeInTheDocument();
  });

  it("calls notFound when company data is not found", () => {
    vi.mocked(useCompany).mockReturnValue({ data: undefined } as never);
    expect(() => renderWithQuery(<Company />)).toThrow("NEXT_NOT_FOUND");
  });

  it("renders a transcript link when pdfUrl is present", () => {
    vi.mocked(useCompany).mockReturnValue({ data: { ...mockCompanyA, events: [mockEventWithPdf] } } as never);
    renderWithQuery(<Company />);
    expect(screen.getByRole("link", { name: /view transcript/i })).toBeInTheDocument();
  });

  it("renders N/A when pdfUrl is absent", () => {
    vi.mocked(useCompany).mockReturnValue({ data: { ...mockCompanyA, events: [mockEventNoPdf] } } as never);
    renderWithQuery(<Company />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("disables the play button when audioUrl is absent", () => {
    vi.mocked(useCompany).mockReturnValue({ data: { ...mockCompanyA, events: [mockEventWithPdf] } } as never);
    renderWithQuery(<Company />);
    expect(screen.getByRole("button", { name: /play/i })).toBeDisabled();
  });

  it("renders the reporting currency in the table caption", () => {
    vi.mocked(useCompany).mockReturnValue({ data: mockCompanyA } as never);
    renderWithQuery(<Company />);
    expect(screen.getByText((_, el) => el?.textContent === "Financial reporting is in NOK")).toBeInTheDocument();
  });

  it("renders a View report link for each event", () => {
    vi.mocked(useCompany).mockReturnValue({ data: { ...mockCompanyA, events: [mockEventWithPdf] } } as never);
    renderWithQuery(<Company />);
    expect(screen.getByRole("link", { name: /view report/i })).toBeInTheDocument();
  });

  it("renders the Investors link", () => {
    vi.mocked(useCompany).mockReturnValue({ data: mockCompanyA } as never);
    renderWithQuery(<Company />);
    expect(screen.getByRole("link", { name: /investors/i })).toBeInTheDocument();
  });

  it("renders the Information link", () => {
    vi.mocked(useCompany).mockReturnValue({ data: mockCompanyA } as never);
    renderWithQuery(<Company />);
    expect(screen.getByRole("link", { name: /information/i })).toBeInTheDocument();
  });
});
