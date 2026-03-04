import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { Link } from "@/components/link";
import { TouchTarget } from "@/components/touch-target";
import { cn } from "@/website/styles/cn";

const buttonColors = {
  "dark/white": [
    "text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10",
    "[--btn-icon:var(--color-zinc-400)] active:not-disabled:[--btn-icon:var(--color-zinc-300)] hover:not-disabled:[--btn-icon:var(--color-zinc-300)]",
  ],
  "dark/zinc": [
    "text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10",
    "[--btn-icon:var(--color-zinc-400)] active:not-disabled:[--btn-icon:var(--color-zinc-300)] hover:not-disabled:[--btn-icon:var(--color-zinc-300)]",
  ],
  light: [
    "text-zinc-950 [--btn-bg:white] [--btn-border:var(--color-zinc-950)]/10 [--btn-hover-overlay:var(--color-zinc-950)]/2.5 active:not-disabled:[--btn-border:var(--color-zinc-950)]/15 hover:not-disabled:[--btn-border:var(--color-zinc-950)]/15",
    "[--btn-icon:var(--color-zinc-500)] active:not-disabled:[--btn-icon:var(--color-zinc-700)] hover:not-disabled:[--btn-icon:var(--color-zinc-700)]",
  ],
};

const buttonVariants = cva(
  [
    "relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold",
    "px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6",
    "focus:outline-2 focus:outline-offset-2 focus:outline-blue-500",
    "disabled:opacity-50",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:hover:not-disabled:[--btn-icon:ButtonText]",
  ],
  {
    defaultVariants: { variant: "solid" },
    variants: {
      variant: {
        outline: [
          "border-zinc-950/10 text-zinc-950 active:not-disabled:bg-zinc-950/2.5 hover:not-disabled:bg-zinc-950/2.5",
          "[--btn-icon:var(--color-zinc-500)] active:not-disabled:[--btn-icon:var(--color-zinc-700)] hover:not-disabled:[--btn-icon:var(--color-zinc-700)]",
        ],
        plain: [
          "border-transparent text-zinc-950 active:not-disabled:bg-zinc-950/5 hover:not-disabled:bg-zinc-950/5",
          "[--btn-icon:var(--color-zinc-500)] active:not-disabled:[--btn-icon:var(--color-zinc-700)] hover:not-disabled:[--btn-icon:var(--color-zinc-700)]",
        ],
        solid: [
          "border-transparent bg-(--btn-border)",
          "before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg)",
          "before:shadow-sm",
          "after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)]",
          "after:shadow-[inset_0_1px_--theme(--color-white/15%)]",
          "active:not-disabled:after:bg-(--btn-hover-overlay) hover:not-disabled:after:bg-(--btn-hover-overlay)",
          "disabled:before:shadow-none disabled:after:shadow-none",
        ],
      },
    },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & { color?: keyof typeof buttonColors } & (
    | (ComponentPropsWithoutRef<"button"> & { href?: never })
    | (ComponentPropsWithoutRef<"a"> & { href: string })
  );

export function Button({ color = "dark/zinc", variant = "solid", className, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), variant === "solid" && buttonColors[color], className);

  return typeof props.href === "string" ? (
    <Link {...props} className={classes}>
      <TouchTarget>{children}</TouchTarget>
    </Link>
  ) : (
    <button {...props} className={cn("cursor-default", classes)}>
      <TouchTarget>{children}</TouchTarget>
    </button>
  );
}
