// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { GET } from "./route";

const { mockCompanies } = vi.hoisted(() => ({
  mockCompanies: [{ companyId: 1, companyName: "Test Co" }],
}));

vi.mock("@/app/api/mock-data", () => ({ allCompanies: mockCompanies }));

describe("GET /api/companies", () => {
  it("responds with all companies and status 200", async () => {
    const spy = vi.spyOn(Response, "json");
    await GET();
    expect(spy).toHaveBeenCalledWith(mockCompanies, expect.objectContaining({ status: 200 }));
  });
});
