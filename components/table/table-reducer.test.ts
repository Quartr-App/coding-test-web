import { describe, expect, it } from "vitest";
import { tableReducer } from "./table-reducer";

describe("tableReducer", () => {
  it("SET_ITEMS replaces items in state", () => {
    const state = { items: [1, 2] };
    const next = tableReducer(state, { items: [3, 4], type: "SET_ITEMS" });
    expect(next.items).toEqual([3, 4]);
  });

  it("returns current state for unknown actions", () => {
    const state = { items: [1] };
    // biome-ignore lint/suspicious/noExplicitAny: testing default branch
    const next = tableReducer(state, { type: "UNKNOWN" } as any);
    expect(next).toBe(state);
  });
});
