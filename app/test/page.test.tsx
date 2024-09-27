import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "../page";
import "@testing-library/jest-dom";

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [
            {
              companyId: 1,
              companyName: "Vanessas Company",
              displayName: "Vanessas Company",
              logoDarkUrl: "/test-logo.png",
              description: "This is my company",
              liveUrl: "http://live.com",
              infoUrl: "http://info.com",
              reportingCurrency: "SEK",
              companyTicker: "XXX",
            },
          ],
        }),
    })
  ) as jest.Mock;
});

describe("Home Component", () => {
  test("renders the Home component", async () => {
    render(<Page />);

    // Using waitFor to handle the async state update that is triggered by useEffect
    await waitFor(() => {
      const headingElement = screen.getByText(/Quartr/i);
      expect(headingElement).toBeInTheDocument();
    });
  });
});
