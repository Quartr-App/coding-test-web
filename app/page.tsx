"use client";

import { Inter } from "@next/font/google";
import { CompanyItemList } from "../components/CompanyItemList/CompanyItemList";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={inter.className}>
      <h1>Trending companies</h1>
      <CompanyItemList />
    </main>
  );
}
