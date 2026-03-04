// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { GET } from "./route";

const { mockEvent, mockCompanies } = vi.hoisted(() => {
  const mockEvent = { eventId: 1, eventTitle: "Q1 2023" };
  return { mockCompanies: [{ companyId: 10, companyName: "Test Co", events: [mockEvent] }], mockEvent };
});

vi.mock("@/app/api/mock-data", () => ({ allCompanies: mockCompanies }));

describe("GET /api/events", () => {
  it("responds with a flat list of events enriched with company info and status 200", async () => {
    const spy = vi.spyOn(Response, "json");
    await GET();
    expect(spy).toHaveBeenCalledWith(
      [{ ...mockEvent, companyId: 10, companyName: "Test Co" }],
      expect.objectContaining({ status: 200 }),
    );
  });
});
