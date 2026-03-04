import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./index";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>OKEA</Badge>);
    expect(screen.getByText("OKEA")).toBeInTheDocument();
  });

  it("merges additional className onto the element", () => {
    render(<Badge className="custom-class">OKEA</Badge>);
    expect(screen.getByText("OKEA")).toHaveClass("custom-class");
  });
});
