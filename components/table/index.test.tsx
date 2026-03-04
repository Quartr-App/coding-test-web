import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Table } from "./index";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Table.Row", () => {
  it("renders a link with aria-label from title when href and title are provided", () => {
    render(
      <Table items={[]}>
        <Table.Body>
          <Table.Row href="/companies/1" title="OKEA">
            <Table.Cell>OKEA</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(screen.getByRole("link", { name: "OKEA" })).toBeInTheDocument();
  });

  it("renders no link inside the cell when href is not provided", () => {
    render(
      <Table items={[]}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>OKEA</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});

describe("Table.Caption", () => {
  it("has class caption-top when position is top", () => {
    render(
      <Table items={[]}>
        <Table.Caption position="top">Note</Table.Caption>
      </Table>,
    );
    expect(screen.getByText("Note")).toHaveClass("caption-top");
  });
});
