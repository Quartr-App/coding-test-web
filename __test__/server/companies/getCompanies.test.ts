import { getCompanies } from "@/server/companies";

describe("getCompanies", () => {
  test("returns CompaniesResponse structure", async () => {
    const res = await getCompanies();

    expect(res).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
      }),
    );
  });
});
