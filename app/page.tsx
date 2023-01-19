"use client";

import Companies from "./companies/page";

export default function Home() {
  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <Companies />
    </main>
  );
}
