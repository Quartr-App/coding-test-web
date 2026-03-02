import { type ComponentPropsWithoutRef, useCallback, useMemo, useReducer } from "react";
import { type ListState, listReducer } from "./list-reducer";

export type UseHeadlessListProps<T> = {
  items: T[];
};

export type UseHeadlessList<T> = {
  state: ListState<T>;
  getListItemProps: (userProps?: ComponentPropsWithoutRef<"li">) => ComponentPropsWithoutRef<"li">;
};

export function useHeadlessList<T>({ items = [] }: UseHeadlessListProps<T>): UseHeadlessList<T> {
  const [state] = useReducer(listReducer, {
    items,
  });

  const getListItemProps = useCallback(
    (userProps?: ComponentPropsWithoutRef<"li">) => ({
      role: "listitem",
      ...userProps,
    }),
    [],
  );

  return useMemo(
    () => ({
      getListItemProps,
      state,
    }),
    [state, getListItemProps],
  );
}
