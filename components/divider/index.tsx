import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/website/styles/cn";

const dividerVariants = cva("w-full border-t", {
  defaultVariants: { soft: false },
  variants: {
    soft: {
      false: "border-zinc-950/10",
      true: "border-zinc-950/5",
    },
  },
});

export function Divider({
  soft = false,
  className,
  ...props
}: VariantProps<typeof dividerVariants> & ComponentPropsWithoutRef<"hr">) {
  return <hr {...props} className={cn(dividerVariants({ soft }), className)} />;
}
