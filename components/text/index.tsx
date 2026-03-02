import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/website/styles/cn";

export type TextProps = ComponentPropsWithoutRef<"p">;

export function Text({ className, ...props }: TextProps) {
  return <p {...props} className={cn("text-base/6 text-zinc-500 sm:text-sm/6", className)} />;
}
