import { GET } from "../../app/api/companies/route";
import { companiesRawData } from "../../lib/companies/mock-companies";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data) => ({
      status: 200,
      json: () => Promise.resolve(data),
    })),
  },
}));

describe("GET /api/companies", () => {
  it("returns the raw companies response", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ data: companiesRawData });
  });
});
