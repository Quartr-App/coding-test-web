import { describe, expect, it } from "vitest";
import { listReducer } from "./list-reducer";

describe("listReducer", () => {
  it("SET_ITEMS replaces items in state", () => {
    const state = { items: [1, 2] };
    expect(listReducer(state, { items: [3, 4], type: "SET_ITEMS" }).items).toEqual([3, 4]);
  });

  it("returns current state for unknown actions", () => {
    const state = { items: [1] };
    // biome-ignore lint/suspicious/noExplicitAny: testing default branch
    expect(listReducer(state, { type: "UNKNOWN" } as any)).toBe(state);
  });
});
