import type { ComponentPropsWithoutRef } from "react";
import { Link } from "@/components/link";
import { cn } from "@/website/styles/cn";

export type TextProps = ComponentPropsWithoutRef<"p">;

export function Text({ className, ...props }: TextProps) {
  return <p {...props} className={cn("text-base/6 text-zinc-500 sm:text-sm/6", className)} />;
}

export function TextLink({ className, ...props }: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={cn("text-zinc-950 underline decoration-zinc-950/50 hover:decoration-zinc-950", className)}
      {...props}
    />
  );
}

type StrongProps = ComponentPropsWithoutRef<"strong">;

export function Strong({ className, ...props }: StrongProps) {
  return <strong {...props} className={cn("font-medium text-zinc-950", className)} />;
}
