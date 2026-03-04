// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

const { mockCompany, mockCompanies } = vi.hoisted(() => {
  const mockCompany = { companyId: 2, companyName: "Test Co" };
  return { mockCompanies: [mockCompany], mockCompany };
});

vi.mock("@/app/api/mock-data", () => ({ allCompanies: mockCompanies }));

describe("GET /api/companies/[id]", () => {
  let spy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    spy = vi.spyOn(Response, "json").mockImplementation((_, init) => new Response(null, init));
  });

  it("responds with the matching company and status 200", async () => {
    await GET(new Request("http://localhost"), { params: Promise.resolve({ id: "2" }) });
    expect(spy).toHaveBeenCalledWith(mockCompany, expect.objectContaining({ status: 200 }));
  });

  it("returns 404 for an id that does not exist", async () => {
    await GET(new Request("http://localhost"), { params: Promise.resolve({ id: "9999" }) });
    expect(spy).toHaveBeenCalledWith(undefined, expect.objectContaining({ status: 404 }));
  });

  it("returns 400 for a non-numeric id", async () => {
    await GET(new Request("http://localhost"), { params: Promise.resolve({ id: "abc" }) });
    expect(spy).toHaveBeenCalledWith(undefined, expect.objectContaining({ status: 400 }));
  });
});
