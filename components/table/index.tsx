import { type ComponentPropsWithoutRef, createContext, useContext, useRef } from "react";
import { Link } from "@/components/link";
import { cn } from "@/website/styles/cn";
import { type UseHeadlessTable, type UseHeadlessTableProps, useHeadlessTable } from "./use-headless-table";

function createTableStateContext<T>() {
  return createContext<UseHeadlessTable<T> | null>(null);
}

const TableStateContext = createTableStateContext();

function useTableStateContext() {
  const ctx = useContext(TableStateContext);
  if (!ctx) {
    throw new Error("Table* components must be inside <Table>");
  }
  return ctx;
}

type TableConfig = {
  bleed?: boolean;
  dense?: boolean;
  grid?: boolean;
  striped?: boolean;
};

const TableConfigContext = createContext<TableConfig>({
  bleed: false,
  dense: false,
  grid: false,
  striped: false,
});

function useTableConfigContext() {
  const ctx = useContext(TableConfigContext);
  if (!ctx) {
    throw new Error("Table* components must be inside <Table>");
  }
  return ctx;
}

type TableProps<T> = UseHeadlessTableProps<T> & TableConfig & ComponentPropsWithoutRef<"div">;

export function Table<T>({
  bleed = false,
  dense = false,
  grid = false,
  striped = false,
  items,
  className,
  children,
  ...props
}: TableProps<T>) {
  const api = useHeadlessTable({ items });

  return (
    <TableStateContext value={api}>
      <TableConfigContext value={{ bleed, dense, grid, striped }}>
        <div className="flow-root">
          <div {...props} className={cn("-mx-(--gutter) overflow-x-auto whitespace-nowrap", className)}>
            <div className={cn("inline-block min-inline-full align-middle", !bleed && "sm:px-(--gutter)")}>
              <table className="min-inline-full text-start text-sm/6 text-zinc-950">{children}</table>
            </div>
          </div>
        </div>
      </TableConfigContext>
    </TableStateContext>
  );
}

export function TableHead({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return <thead className={cn("text-zinc-500", className)} {...props} />;
}

export function TableBody(props: ComponentPropsWithoutRef<"tbody">) {
  return <tbody {...props} />;
}

type TableRowConfigProps = {
  href?: string;
  title?: string;
  target?: string;
};

const TableRowConfigContext = createContext<TableRowConfigProps>({
  href: undefined,
  target: undefined,
  title: undefined,
});

const useTableRowConfigContext = () => {
  const ctx = useContext(TableRowConfigContext);
  if (!ctx) {
    throw new Error("useTableRowConfigContext must be used within a <TableRow>");
  }
  return ctx;
};

type TableRowProps = TableRowConfigProps & ComponentPropsWithoutRef<"tr">;

export function TableRow({ href, target, title, className, ...props }: TableRowProps) {
  const { striped } = useTableConfigContext();

  return (
    <TableRowConfigContext value={{ href, target, title }}>
      <tr
        className={cn(
          href &&
            "has-[[data-row-link]:focus]:outline-2 has-[[data-row-link]:focus]:-outline-offset-2 has-[[data-row-link]:focus]:outline-blue-500",
          striped && "even:bg-zinc-950/2.5",
          href && striped && "hover:bg-zinc-950/5",
          href && !striped && "hover:bg-zinc-950/2.5",
          className,
        )}
        {...props}
      />
    </TableRowConfigContext>
  );
}

export function TableHeader({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  const { bleed, grid } = useTableConfigContext();

  return (
    <th
      className={cn(
        "border-b border-b-zinc-950/10 px-4 py-2 font-medium first:ps-(--gutter,--spacing(2)) last:pe-(--gutter,--spacing(2))",
        grid && "border-s border-s-zinc-950/5 first:border-s-0",
        !bleed && "sm:first:ps-1 sm:last:pe-1",
        "text-start",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, children, ...props }: ComponentPropsWithoutRef<"td">) {
  const { bleed, dense, grid, striped } = useTableConfigContext();
  const { href, target, title } = useTableRowConfigContext();
  const { getTableCellLinkProps } = useTableStateContext();
  const cellRef = useRef<HTMLTableCellElement | null>(null);

  return (
    <td
      ref={href ? cellRef : undefined}
      {...props}
      className={cn(
        "relative px-4 first:ps-(--gutter,--spacing(2)) last:pe-(--gutter,--spacing(2))",
        !striped && "border-be border-zinc-950/5",
        grid && "border-s border-s-zinc-950/5 first:border-s-0",
        dense ? "py-2.5" : "py-4",
        !bleed && "sm:first:ps-1 sm:last:pe-1",
        className,
      )}
    >
      {href && (
        <Link
          className="absolute inset-0 focus:outline-hidden"
          data-row-link
          tabIndex={cellRef?.current?.previousElementSibling === null ? 0 : -1}
          {...getTableCellLinkProps({ href, target, title })}
        />
      )}
      {children}
    </td>
  );
}

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Header = TableHeader;
Table.Cell = TableCell;
