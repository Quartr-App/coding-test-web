"use client"

import { Logo } from "@/components/core"
import { SiGithub } from "@icons-pack/react-simple-icons"
import Link from "next/link"

export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-start h-16 px-6">
        <Link href="https://quartr.com">
          <Logo />
        </Link>
        <div className="flex w-full justify-end">
          <Link href="https://github.com/JuliusWallblom/coding-test-web" target="_blank">
            <SiGithub />
          </Link>
        </div>
      </div>
    </header>
  )
}
