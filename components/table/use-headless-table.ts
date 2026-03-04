import { useCallback, useMemo, useReducer } from "react";
import type { LinkProps } from "@/components/link";
import { type TableState, tableReducer } from "./table-reducer";

export type UseHeadlessTableProps<T> = {
  items: T[];
};

type TableCellLinkProps = {
  title?: string;
  href: string;
  target?: string;
};

export type UseHeadlessTable<T> = {
  state: TableState<T>;
  getTableCellLinkProps: (userProps: TableCellLinkProps) => LinkProps;
};

export function useHeadlessTable<T>({ items = [] }: UseHeadlessTableProps<T>): UseHeadlessTable<T> {
  const [state] = useReducer(tableReducer, {
    items,
  });

  const getTableCellLinkProps = useCallback(
    ({ title, ...rest }: TableCellLinkProps) => ({
      "aria-label": title,
      ...rest,
    }),
    [],
  );

  return useMemo(
    () => ({
      getTableCellLinkProps,
      state,
    }),
    [getTableCellLinkProps, state],
  );
}
