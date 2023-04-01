import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("should render", async () => {
    render(<Home />);

    const heading = screen.getAllByRole("heading");
    expect(heading[0]).toHaveTextContent("Quartr");
    expect(heading[1]).toHaveTextContent("Trending companies");
  });
});
