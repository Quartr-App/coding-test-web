import { render, screen, within } from "@testing-library/react";
import { CompaniesList } from "@/components/CompaniesList";
import { type Company, getCompanies } from "@/server/companies";
import { CompanyItem } from "@/components/CompanyItem";
import { buildCompany } from "__test__/helpers";

jest.mock("@/server/companies", () => ({
  getCompanies: jest.fn(),
}));

jest.mock("@/components/CompanyItem", () => ({
  CompanyItem: jest.fn(() => <></>),
}));

const mockedGetCompanies = getCompanies as jest.MockedFunction<
  typeof getCompanies
>;
const mockedCompanyItem = CompanyItem as jest.Mock;

describe("CompaniesList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("empty state", async () => {
    mockedGetCompanies.mockResolvedValue({ data: [] });

    render(await CompaniesList());

    expect(screen.getByRole("status")).toHaveTextContent("No companies found.");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(mockedCompanyItem).not.toHaveBeenCalled();
  });

  test("with a list of companies", async () => {
    const companies = [
      buildCompany({ companyId: 1, displayName: "OKEA" }),
      buildCompany({ companyId: 2, displayName: "Atria" }),
    ] as Company[];

    mockedGetCompanies.mockResolvedValue({ data: companies });

    render(await CompaniesList());

    const listItems = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(listItems).toHaveLength(companies.length);

    // Verify props passed into CompanyItem
    expect(
      mockedCompanyItem.mock.calls.map(
        ([props]: [{ company: unknown }]) => props.company,
      ),
    ).toEqual(companies);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
