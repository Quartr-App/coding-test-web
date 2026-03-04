import { describe, expect, it } from "vitest";
import { getContrastColor } from "./get-contrast-color";

describe("getContrastColor", () => {
  it("returns dark text class for white background", () => {
    expect(getContrastColor("#ffffff")).toBe("text-zinc-950");
  });

  it("returns light text class for black background", () => {
    expect(getContrastColor("#000000")).toBe("text-zinc-100");
  });
});
