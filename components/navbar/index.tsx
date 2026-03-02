"use client";

import { LayoutGroup, motion } from "motion/react";
import { type ComponentPropsWithoutRef, createContext, useContext, useId } from "react";
import { Link } from "@/components/link";
import { TouchTarget } from "@/components/touch-target";
import { cn } from "@/website/styles/cn";
import { type UseHeadlessNavbar, type UseHeadlessNavbarProps, useHeadlessNavbar } from "./use-headless-navbar";

function createNavbarStateContext<T>() {
  return createContext<UseHeadlessNavbar<T> | null>(null);
}

const NavbarStateContext = createNavbarStateContext();

function useNavbarStateContext() {
  const ctx = useContext(NavbarStateContext);
  if (!ctx) {
    throw new Error("Navbar.* components must be inside <Navbar>");
  }
  return ctx;
}

type NavbarProps<T> = UseHeadlessNavbarProps<T> &
  ComponentPropsWithoutRef<"nav"> & {
    label: string;
  };

export function Navbar<T>({ children, className, items, label, ...props }: NavbarProps<T>) {
  const api = useHeadlessNavbar({ items });

  return (
    <NavbarStateContext value={api}>
      <nav aria-label={label} className={cn("flex flex-1 items-center gap-4 py-2.5", className)} {...props}>
        {children}
      </nav>
    </NavbarStateContext>
  );
}

type NavbarItemProps =
  | (ComponentPropsWithoutRef<"button"> & { href?: never })
  | (ComponentPropsWithoutRef<"a"> & { href: string });

export function NavbarItem({ className, children, ...props }: NavbarItemProps) {
  const { currentPathname, getNavbarItemProps } = useNavbarStateContext();
  const current = props.href === currentPathname;
  const classes = cn(
    // Base
    "relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-start text-base/6 font-medium text-zinc-950 sm:text-sm/5",
    // Leading icon/icon-only
    "*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5",
    // Trailing icon (down chevron or similar)
    "*:not-nth-2:last:data-[slot=icon]:ms-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4",
    // Avatar
    "*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 *:data-[slot=avatar]:[--avatar-radius:var(--radius-md)] sm:*:data-[slot=avatar]:size-6",
    // Hover
    "hover:bg-zinc-950/5 hover:*:data-[slot=icon]:fill-zinc-950",
    // Active
    "active:bg-zinc-950/5 active:*:data-[slot=icon]:fill-zinc-950",
  );

  return (
    <span className={cn("relative", className)}>
      {current && (
        <motion.span
          className="absolute inset-x-2 -inset-be-2.5 block-0.5 rounded-full bg-zinc-950"
          layoutId="current-indicator"
        />
      )}
      {typeof props.href === "string" ? (
        <Link {...getNavbarItemProps(props)}>
          <TouchTarget>{children}</TouchTarget>
        </Link>
      ) : (
        <button className={cn("cursor-default", classes)} {...getNavbarItemProps(props)}>
          <TouchTarget>{children}</TouchTarget>
        </button>
      )}
    </span>
  );
}

export function NavbarDivider({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  const { getNavbarDividerProps } = useNavbarStateContext();
  return <div className={cn("block-6 inline-px bg-zinc-950/10", className)} {...getNavbarDividerProps(props)} />;
}

export function NavbarSection({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  const id = useId();

  return (
    <LayoutGroup id={id}>
      <div {...props} className={cn("flex items-center gap-3", className)} />
    </LayoutGroup>
  );
}

Navbar.Item = NavbarItem;
Navbar.Divider = NavbarDivider;
Navbar.Section = NavbarSection;
