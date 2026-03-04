import { describe, expect, it } from "vitest";
import { getImageSize } from "./get-image-size";

describe("getImageSize", () => {
  it("returns square dimensions for 1x1 aspect ratio", () => {
    expect(getImageSize({ width: 120, aspectRatio: "1x1" })).toEqual({ width: 120, height: 120 });
  });

  it("returns correct height for 3x2 aspect ratio", () => {
    expect(getImageSize({ width: 120, aspectRatio: "3x2" })).toEqual({ width: 120, height: 80 });
  });

  it("returns correct height for 16x9 aspect ratio", () => {
    expect(getImageSize({ width: 160, aspectRatio: "16x9" })).toEqual({ width: 160, height: 90 });
  });

  it("returns explicit height as-is, ignoring aspect ratio", () => {
    expect(getImageSize({ width: 120, height: 60 })).toEqual({ width: 120, height: 60 });
  });
});
