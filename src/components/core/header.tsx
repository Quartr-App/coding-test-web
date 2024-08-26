import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-start h-16 px-6">
        <Link href="https://quartr.com">
          <Image src="/logo.svg" alt="Quartr Logo" width={121} height={32} />
        </Link>
      </div>
    </header>
  )
}
