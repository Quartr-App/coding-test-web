import { describe, expect, it } from "vitest";
import { getImageSize } from "./get-image-size";

describe("getImageSize", () => {
  it("returns square dimensions for 1x1 aspect ratio", () => {
    expect(getImageSize({ aspectRatio: "1x1", width: 120 })).toEqual({ height: 120, width: 120 });
  });

  it("returns correct height for 3x2 aspect ratio", () => {
    expect(getImageSize({ aspectRatio: "3x2", width: 120 })).toEqual({ height: 80, width: 120 });
  });

  it("returns correct height for 16x9 aspect ratio", () => {
    expect(getImageSize({ aspectRatio: "16x9", width: 160 })).toEqual({ height: 90, width: 160 });
  });

  it("returns explicit height as-is, ignoring aspect ratio", () => {
    expect(getImageSize({ height: 60, width: 120 })).toEqual({ height: 60, width: 120 });
  });
});
