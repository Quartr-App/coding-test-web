import { capitalizeFirst } from "../../lib/utils";

describe("capitalizeFirst", () => {
  it("capitalizes the first character", () => {
    expect(capitalizeFirst("hello")).toBe("Hello");
  });

  it("returns empty string unchanged", () => {
    expect(capitalizeFirst("")).toBe("");
  });

  it("does not change an already capitalized string", () => {
    expect(capitalizeFirst("Hello")).toBe("Hello");
  });

  it("works with one character", () => {
    expect(capitalizeFirst("h")).toBe("H");
  });

  it("leaves non-letter first characters unchanged", () => {
    expect(capitalizeFirst("1hello")).toBe("1hello");
  });
});
