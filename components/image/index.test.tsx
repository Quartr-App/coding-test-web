import { render, screen } from "@testing-library/react";
import type { ComponentPropsWithoutRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Image } from "./index";

vi.mock("next/image", () => ({
  default: ({ src, alt, className, ...props }: ComponentPropsWithoutRef<"img"> & { src: string }) => (
    // biome-ignore lint/performance/noImgElement: Testing the Image component itself
    <img alt={alt} className={className} src={src} {...props} />
  ),
}));

describe("Image", () => {
  it("renders an img element", () => {
    render(<Image alt="test" height={100} src="/test.png" width={100} />);
    expect(screen.getByAltText("test")).toBeInTheDocument();
  });

  it("applies object-fill and object-center classes when fill is true", () => {
    render(<Image alt="filled" fill src="/test.png" />);
    const img = screen.getByAltText("filled");
    expect(img.className).toContain("object-fill");
    expect(img.className).toContain("object-center");
  });
});
