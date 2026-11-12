import { act, render, screen } from "@testing-library/react";
import EventTab from "../../app/components/Card/eventTab";
import { checkPdf } from "../../lib/api/checkPdf";
import { companyType } from "../../types/common.types";

jest.mock("../../lib/api/checkPdf", () => ({
  checkPdf: jest.fn(),
}));

const mockCheckPdf = jest.mocked(checkPdf);

const createDeferred = <T,>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });

  return { promise, resolve };
};

const company: companyType = {
  companyId: 1,
  companyName: "Test Company",
  infoUrl: "https://example.com",
  companyCountry: "NO",
  companyTicker: "TEST",
  description: "Test company description",
  iconUrl: "",
  logoLightUrl: "",
  logoDarkUrl: "",
  events: [
    {
      eventId: 1,
      eventTitle: "Q3 2025",
      eventDate: "2025-10-20T08:00:00.000Z",
      reportUrl: "https://example.com/report.pdf",
      pdfUrl: "https://example.com/presentation.pdf",
    },
  ],
};

describe("EventTab", () => {
  beforeEach(() => {
    mockCheckPdf.mockReset();
  });

  it("shows the latest event and links for valid PDF files", async () => {
    mockCheckPdf.mockResolvedValue(true);

    render(<EventTab company={company} />);

    expect(screen.getByText("Q3 2025")).toBeInTheDocument();

    expect(
      await screen.findByRole("link", { name: "Annual / Interim Report" }),
    ).toHaveAttribute("href", "https://example.com/report.pdf");
    expect(
      screen.getByRole("link", { name: "Presentation PDF" }),
    ).toHaveAttribute("href", "https://example.com/presentation.pdf");
    expect(mockCheckPdf).toHaveBeenCalledTimes(2);
  });

  it("does not show PDF links when the files are invalid", async () => {
    const reportCheck = createDeferred<boolean>();
    const presentationCheck = createDeferred<boolean>();
    mockCheckPdf
      .mockReturnValueOnce(reportCheck.promise)
      .mockReturnValueOnce(presentationCheck.promise);

    render(<EventTab company={company} />);

    expect(mockCheckPdf).toHaveBeenCalledTimes(2);

    await act(async () => {
      reportCheck.resolve(false);
      presentationCheck.resolve(false);
      await Promise.all([reportCheck.promise, presentationCheck.promise]);
    });

    expect(
      screen.queryByRole("link", { name: "Annual / Interim Report" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Presentation PDF" }),
    ).not.toBeInTheDocument();
  });

  it("shows an empty state when the company has no events", () => {
    render(<EventTab company={{ ...company, events: [] }} />);

    expect(screen.getByText("No events available.")).toBeInTheDocument();
    expect(mockCheckPdf).not.toHaveBeenCalled();
  });
});
