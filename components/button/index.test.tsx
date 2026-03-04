import { render, screen } from "@testing-library/react";
import type { ComponentPropsWithoutRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./index";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: ComponentPropsWithoutRef<"a"> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Button", () => {
  it("renders an anchor when href is provided", () => {
    render(<Button href="/test">Click</Button>);
    expect(screen.getByRole("link", { name: "Click" })).toBeInTheDocument();
  });

  it("renders a button when href is not provided", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
  });

  it("button is disabled when disabled prop is set", () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toBeDisabled();
  });
});
