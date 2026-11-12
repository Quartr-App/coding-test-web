import { checkPdf } from "../../lib/api/checkPdf";

describe("checkPdf", () => {
  const originalFetch = global.fetch;
  const url = "https://example.com/document.pdf";

  beforeEach(() => {
    global.fetch = jest.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("returns true for a successful PDF response", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: true,
      headers: { get: jest.fn().mockReturnValue("application/pdf") },
    });

    await expect(checkPdf(url)).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(url, { method: "HEAD" });
  });

  it("returns false when the response is not successful", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: false,
      headers: { get: jest.fn().mockReturnValue("application/pdf") },
    });

    await expect(checkPdf(url)).resolves.toBe(false);
  });

  it("returns false when the response is not a PDF", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: true,
      headers: { get: jest.fn().mockReturnValue("text/html") },
    });

    await expect(checkPdf(url)).resolves.toBe(false);
  });

  it("returns false when the request throws", async () => {
    const fetchMock = global.fetch as jest.Mock;
    const error = new Error("Network error");
    fetchMock.mockRejectedValue(error);
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    await expect(checkPdf(url)).resolves.toBe(false);
    expect(consoleError).toHaveBeenCalledWith("Failed to check PDF:", error);
  });
});
