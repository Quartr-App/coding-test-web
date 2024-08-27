import { twMerge } from "tailwind-merge"

export function Separator({ direction = "horizontal", className }: { direction?: "horizontal" | "vertical"; className?: string }) {
  return <div className={twMerge(direction === "horizontal" ? "w-full h-px bg-border" : "h-full w-px bg-border", className)} />
}
