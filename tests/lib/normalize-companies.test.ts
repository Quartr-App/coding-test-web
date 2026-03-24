import { normalizeCompanies } from "../../lib/companies/normalize-companies";
import { CompanyRawData } from "../../types";

describe("normalizeCompanies", () => {
  it("normalizes valid companies", () => {
    const rawCompanies: CompanyRawData[] = [
      {
        companyId: 1,
        displayName: "  Acme  ",
        companyName: "  Acme Inc  ",
        companyCountry: " SE ",
        companyTicker: " ACM ",
        description: "  Test company ",
        infoUrl: " https://example.com ",
        logoDarkUrl: " https://example.com/logo-dark.png ",
      },
    ];

    const normalizedCompanies = normalizeCompanies(rawCompanies);

    expect(normalizedCompanies).toEqual([
      {
        companyId: 1,
        displayName: "Acme",
        companyName: "Acme Inc",
        companyCountry: "SE",
        companyTicker: "ACM",
        logoUrl: "https://example.com/logo-dark.png",
        description: "Test company",
        infoUrl: "https://example.com",
      },
    ]);
  });

  it("filters companies without numeric companyId", () => {
    const rawCompanies: CompanyRawData[] = [
      {
        companyId: "1",
        displayName: "Acme",
      } as any,
    ];

    const normalizedCompanies = normalizeCompanies(rawCompanies);

    expect(normalizedCompanies).toEqual([]);
  });

  it("filters companies without display name or company name", () => {
    const rawCompanies: CompanyRawData[] = [
      {
        companyId: 1,
        displayName: "   ",
        companyName: "   ",
      },
    ];

    const normalizedCompanies = normalizeCompanies(rawCompanies);

    expect(normalizedCompanies).toEqual([]);
  });

  it("falls back to companyName when displayName is missing", () => {
    const rawCompanies: CompanyRawData[] = [
      {
        companyId: 1,
        companyName: "  Acme Inc ",
      },
    ] as any;

    const normalizedCompanies = normalizeCompanies(rawCompanies);

    expect(normalizedCompanies[0].displayName).toBe("Acme Inc");
  });

  it("uses first available trimmed logo url", () => {
    const rawCompanies: CompanyRawData[] = [
      {
        companyId: 1,
        displayName: "Acme",
        logoDarkUrl: "   ",
        logoLightUrl: " https://example.com/light.png ",
        iconUrl: " https://example.com/icon.png ",
      },
    ] as any;

    const normalizedCompanies = normalizeCompanies(rawCompanies);

    expect(normalizedCompanies[0].logoUrl).toBe(
      "https://example.com/light.png",
    );
  });

  it("uses companyName when displayName is missing", () => {
    const rawCompanies: CompanyRawData[] = [
      {
        companyId: 1,
        companyName: "  acme inc  ",
      },
    ];

    const normalizedCompanies = normalizeCompanies(rawCompanies);

    expect(normalizedCompanies).toEqual([
      {
        companyId: 1,
        companyCountry: "",
        companyName: "acme inc",
        companyTicker: "",
        displayName: "Acme inc",
        logoUrl: "",
        description: "",
        infoUrl: "",
      },
    ]);
  });

  it("filters companies when both displayName and companyName are empty", () => {
    const rawCompanies: CompanyRawData[] = [
      {
        companyId: 1,
        displayName: "   ",
        companyName: "   ",
      },
    ];

    const normalizedCompanies = normalizeCompanies(rawCompanies);

    expect(normalizedCompanies).toEqual([]);
  });

  it("falls back to the next available logo url", () => {
    const rawCompanies: CompanyRawData[] = [
      {
        companyId: 1,
        displayName: "Acme",
        logoLightUrl: "   ",
        logoDarkUrl: " https://example.com/dark-logo.png ",
        iconUrl: " https://example.com/icon.png ",
      },
    ];

    const normalizedCompanies = normalizeCompanies(rawCompanies);

    expect(normalizedCompanies).toEqual([
      {
        companyId: 1,
        companyCountry: "",
        companyName: "",
        companyTicker: "",
        displayName: "Acme",
        logoUrl: "https://example.com/dark-logo.png",
        description: "",
        infoUrl: "",
      },
    ]);
  });

  it("returns an empty string when no logo url exists", () => {
    const rawCompanies: CompanyRawData[] = [
      {
        companyId: 1,
        displayName: "Acme",
        logoLightUrl: "   ",
        logoDarkUrl: "   ",
        iconUrl: "   ",
      },
    ];

    const normalizedCompanies = normalizeCompanies(rawCompanies);

    expect(normalizedCompanies).toEqual([
      {
        companyId: 1,
        companyCountry: "",
        companyName: "",
        companyTicker: "",
        displayName: "Acme",
        logoUrl: "",
        description: "",
        infoUrl: "",
      },
    ]);
  });
});
