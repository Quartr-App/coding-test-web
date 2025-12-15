"use client";

import { Inter } from "@next/font/google";
import { useTrending } from "./lib/useTrending";
import { TrendingList } from "./components/trendingList/TrendingList";
import "./page.css";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { companies, loading } = useTrending();

  return (
    <main className={inter.className}>
      <h2>Trending companies</h2>
      <TrendingList companies={companies || []} showLoading={loading} />
    </main>
  );
}
