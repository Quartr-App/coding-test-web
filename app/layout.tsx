import type { Metadata } from "next";
import "@/website/styles/globals.css";
import type { ReactNode } from "react";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { Navbar, NavbarDivider, NavbarItem, NavbarSection } from "@/components/navbar";
import { inter } from "@/website/styles/fonts";

const title = {
  default: "Quartr",
  template: "%s | Quartr",
};

export const metadata: Metadata = {
  title,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${inter.variable} antialiased lg:bg-zinc-100`} lang="en">
      <body className="relative isolate flex min-h-svh w-full flex-col bg-white lg:bg-zinc-100">
        <header className="flex items-center px-4">
          <div className="py-2.5 lg:hidden">
            {/* <NavbarItem aria-label="Open navigation" onClick={() => setShowSidebar(true)}>
              <OpenMenuIcon />
            </NavbarItem> */}
          </div>
          <div className="min-w-0 flex-1">
            <Navbar items={[]} label="Main">
              <Link href="/">
                <Heading level={2}>Quartr</Heading>
              </Link>
              <NavbarDivider />
              <NavbarSection>
                <NavbarItem href="/">Home</NavbarItem>
                <NavbarItem href="/events">Events</NavbarItem>
              </NavbarSection>
            </Navbar>
          </div>
        </header>
        <main className="flex flex-1 flex-col pb-2 lg:px-2">
          <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
