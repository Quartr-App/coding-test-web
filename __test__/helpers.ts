import { CompanyItem } from "@/components/CompanyItem";

type BuildCompanyInput = Parameters<typeof CompanyItem>[0]["company"];

export function buildCompany(
  overrides: Partial<BuildCompanyInput> = {},
): BuildCompanyInput {
  return {
    companyId: 1,
    displayName: "Foo",
    logoDarkUrl: "https://example.com/logo-dark.png",
    liveUrl: "https://example.com/foo",
    description: "Description",
    ...overrides,
  };
}
