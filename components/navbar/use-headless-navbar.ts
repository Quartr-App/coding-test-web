"use client";

import { usePathname } from "next/navigation";
import { type ComponentPropsWithoutRef, useCallback, useEffect, useMemo, useReducer } from "react";
import { type NavbarState, navbarReducer } from "./navbar-reducer";

export type UseHeadlessNavbarProps<T> = {
  items: T[];
};

type NavbarItemProps =
  | (ComponentPropsWithoutRef<"button"> & { href?: never })
  | (ComponentPropsWithoutRef<"a"> & { href: string });

export type UseHeadlessNavbar<T> = {
  currentPathname: string | null;
  state: NavbarState<T>;
  getNavbarItemProps: <P extends NavbarItemProps>(userProps?: P) => P;
  getNavbarDividerProps: (userProps?: ComponentPropsWithoutRef<"div">) => ComponentPropsWithoutRef<"div">;
};

export function useHeadlessNavbar<T>({ items = [] }: UseHeadlessNavbarProps<T>): UseHeadlessNavbar<T> {
  const pathname = usePathname();
  const [state, dispatch] = useReducer(navbarReducer, {
    currentPathname: pathname,
    items,
  });

  useEffect(() => {
    dispatch({ pathname, type: "SET_CURRENT_PATHNAME" });
  }, [pathname]);

  const isCurrentPathname = useCallback(
    (href?: string) => {
      return state.currentPathname === href;
    },
    [state.currentPathname],
  );

  const getNavbarItemProps = useCallback(
    <P extends NavbarItemProps>(userProps?: P) =>
      ({
        "aria-current": isCurrentPathname(userProps?.href) ? "page" : undefined,
        ...userProps,
      }) as P,
    [isCurrentPathname],
  );

  const getNavbarDividerProps = useCallback(
    (userProps?: ComponentPropsWithoutRef<"div">) => ({ "aria-hidden": true, ...userProps }),
    [],
  );

  return useMemo(
    () => ({
      currentPathname: state.currentPathname,
      getNavbarDividerProps,
      getNavbarItemProps,
      state,
    }),
    [state, getNavbarItemProps, getNavbarDividerProps],
  );
}
