"use client"

import { Icon } from "@/components/core"
import { Eclipse } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export function Footer() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto flex items-center justify-start h-14 px-6">
        <div className="flex w-full items-center gap-4">
          <Link href="https://quartr.com">
            <Icon />
          </Link>
          <p className="text-xs text-muted-foreground font-light">© 2024 Quartr AB</p>
        </div>
        <button className="transition text-muted-foreground hover:text-foreground" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
          <Eclipse className="w-4 h-4" />
        </button>
      </div>
    </footer>
  )
}
