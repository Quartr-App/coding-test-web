import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/website/styles/cn";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

export function Heading({ className, level = 1, ...props }: HeadingProps) {
  const Component: `h${typeof level}` = `h${level}`;

  return <Component {...props} className={cn("text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8", className)} />;
}

export function Subheading({ className, level = 2, ...props }: HeadingProps) {
  const Component: `h${typeof level}` = `h${level}`;

  return <Component {...props} className={cn("text-base/7 font-semibold text-zinc-950 sm:text-sm/6", className)} />;
}
