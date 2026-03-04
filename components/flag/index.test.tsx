import { render, screen } from "@testing-library/react";
import type { ComponentPropsWithoutRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { CountryFlag } from "./index";

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img"> & { src: string }) => (
    <img alt={alt} src={src} {...props} />
  ),
}));

describe("CountryFlag", () => {
  it("renders a flag image for a valid country code", () => {
    render(<CountryFlag countryCode="NO" width={16} />);
    expect(screen.getByAltText("NO flag")).toBeInTheDocument();
  });

  it("renders nothing for an invalid country code", () => {
    render(<CountryFlag countryCode="XX" width={16} />);
    expect(screen.queryByAltText("XX flag")).toBeNull();
  });
});
