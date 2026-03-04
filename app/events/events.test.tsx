import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { mockFlatEvent } from "@/testing/fixtures";
import { Events } from "./events";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("./use-events");

const { useEvents } = await import("./use-events");

describe("Events", () => {
  it("renders the heading", () => {
    vi.mocked(useEvents).mockReturnValue({ data: [mockFlatEvent] } as never);
    render(<Events />);
    expect(screen.getByRole("heading", { name: "Events" })).toBeInTheDocument();
  });

  it("renders the company name as a link", () => {
    vi.mocked(useEvents).mockReturnValue({ data: [mockFlatEvent] } as never);
    render(<Events />);
    expect(screen.getByRole("link", { name: "Måsøval" })).toBeInTheDocument();
  });

  it("renders the fiscal period and year", () => {
    vi.mocked(useEvents).mockReturnValue({ data: [{ ...mockFlatEvent, eventTitle: "Quarterly results" }] } as never);
    render(<Events />);
    expect(screen.getByText("Q3 2022")).toBeInTheDocument();
  });

  it("renders a transcript link when pdfUrl is present", () => {
    vi.mocked(useEvents).mockReturnValue({ data: [mockFlatEvent] } as never);
    render(<Events />);
    expect(screen.getByRole("link", { name: /view transcript/i })).toBeInTheDocument();
  });

  it("renders N/A when pdfUrl is absent", () => {
    vi.mocked(useEvents).mockReturnValue({ data: [{ ...mockFlatEvent, pdfUrl: null }] } as never);
    render(<Events />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("disables the play button when audioUrl is absent", () => {
    vi.mocked(useEvents).mockReturnValue({ data: [mockFlatEvent] } as never);
    render(<Events />);
    expect(screen.getByRole("button", { name: /play/i })).toBeDisabled();
  });

  it("renders the empty state when there are no events", () => {
    vi.mocked(useEvents).mockReturnValue({ data: [] } as never);
    render(<Events />);
    expect(screen.getByText("No events found.")).toBeInTheDocument();
  });
});
