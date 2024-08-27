import { twMerge } from "tailwind-merge"

interface SeparatorProps {
  direction?: "horizontal" | "vertical"
  className?: string
}

export function Separator({ direction = "horizontal", className }: SeparatorProps) {
  return <div className={twMerge(direction === "horizontal" ? "w-full h-px bg-border" : "h-full w-px bg-border", className)} />
}
