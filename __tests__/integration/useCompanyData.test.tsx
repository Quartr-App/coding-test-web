import { createElement, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useCompanyData } from "../../lib/api/fetchCompany";
import { companyType } from "../../types/common.types";

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
];

describe("useCompanyData API fetch", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  const renderCompanyDataHook = () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(QueryClientProvider, { client: queryClient }, children);

    return renderHook(() => useCompanyData(), { wrapper });
  };

  it("fetches companies and returns the response data", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ data: companies }),
    });

    const { result } = renderCompanyDataHook();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/companies");
    expect(result.current.companyData).toEqual(companies);
    expect(result.current.error).toBeNull();
  });

  it("returns an error when the API responds unsuccessfully", async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({ ok: false });

    const { result } = renderCompanyDataHook();

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to fetch companies data");
    });

    expect(result.current.companyData).toEqual([]);
  });
});
