import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { List } from "./index";

describe("List", () => {
  it("renders an unordered list by default", () => {
    render(
      <List items={[]}>
        <List.Item>Hello</List.Item>
      </List>,
    );
    expect(screen.getByRole("list").tagName).toBe("UL");
  });

  it("renders an ordered list when ordered is true", () => {
    render(
      <List items={[]} ordered>
        <List.Item>Hello</List.Item>
      </List>,
    );
    expect(screen.getByRole("list").tagName).toBe("OL");
  });
});
