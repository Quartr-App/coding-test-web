import type { NextApiRequest, NextApiResponse } from "next";
import handler from "../../pages/api/companies";

function createMockResponse() {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  return { status, json } as unknown as NextApiResponse;
}

const mockReq = {} as NextApiRequest;

describe("GET /api/companies", () => {
  it("responds with status 200", () => {
    const res = createMockResponse();
    handler(mockReq, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("returns an object with a data property", () => {
    const res = createMockResponse();
    handler(mockReq, res);
    const json = (res.status as jest.Mock).mock.results[0].value.json;
    expect(json).toHaveBeenCalledWith(expect.objectContaining({ data: expect.anything() }));
  });

  it("returns data as an array", () => {
    const res = createMockResponse();
    handler(mockReq, res);
    const json = (res.status as jest.Mock).mock.results[0].value.json;
    const [[payload]] = (json as jest.Mock).mock.calls;
    expect(Array.isArray(payload.data)).toBe(true);
  });

  it("returns at least one company", () => {
    const res = createMockResponse();
    handler(mockReq, res);
    const json = (res.status as jest.Mock).mock.results[0].value.json;
    const [[payload]] = (json as jest.Mock).mock.calls;
    expect(payload.data.length).toBeGreaterThan(0);
  });

  it("each company has required fields", () => {
    const res = createMockResponse();
    handler(mockReq, res);
    const json = (res.status as jest.Mock).mock.results[0].value.json;
    const [[payload]] = (json as jest.Mock).mock.calls;

    for (const company of payload.data) {
      expect(company).toHaveProperty("companyId");
      expect(company).toHaveProperty("companyName");
      expect(company).toHaveProperty("companyTicker");
      expect(company).toHaveProperty("companyCountry");
      expect(company).toHaveProperty("displayName");
      expect(company).toHaveProperty("logoLightUrl");
      expect(company).toHaveProperty("logoDarkUrl");
      expect(company).toHaveProperty("description");
      expect(company).toHaveProperty("colorSettings");
      expect(company).toHaveProperty("events");
    }
  });

  it("each company has a colorSettings object with a brandColor", () => {
    const res = createMockResponse();
    handler(mockReq, res);
    const json = (res.status as jest.Mock).mock.results[0].value.json;
    const [[payload]] = (json as jest.Mock).mock.calls;

    for (const company of payload.data) {
      expect(company.colorSettings).toHaveProperty("brandColor");
      expect(typeof company.colorSettings.brandColor).toBe("string");
    }
  });

  it("each company has an events array", () => {
    const res = createMockResponse();
    handler(mockReq, res);
    const json = (res.status as jest.Mock).mock.results[0].value.json;
    const [[payload]] = (json as jest.Mock).mock.calls;

    for (const company of payload.data) {
      expect(Array.isArray(company.events)).toBe(true);
    }
  });

  it("each event has required fields", () => {
    const res = createMockResponse();
    handler(mockReq, res);
    const json = (res.status as jest.Mock).mock.results[0].value.json;
    const [[payload]] = (json as jest.Mock).mock.calls;

    for (const company of payload.data) {
      for (const event of company.events) {
        expect(event).toHaveProperty("eventId");
        expect(event).toHaveProperty("eventTitle");
        expect(event).toHaveProperty("eventDate");
        expect(event).toHaveProperty("fiscalPeriod");
        expect(event).toHaveProperty("fiscalYear");
        expect(event).toHaveProperty("reportUrl");
      }
    }
  });
});
