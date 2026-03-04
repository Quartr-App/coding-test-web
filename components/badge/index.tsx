import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/website/styles/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline",
  {
    defaultVariants: { color: "zinc" },
    variants: {
      color: {
        zinc: "bg-zinc-600/10 text-zinc-700",
      },
    },
  },
);

type BadgeProps = VariantProps<typeof badgeVariants> & ComponentPropsWithoutRef<"span">;

export function Badge({ color = "zinc", className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ color }), className)} {...props} />;
}
