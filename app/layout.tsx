import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import { Suspense } from "react";
import Loading from "./loading";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <Suspense fallback={<Loading />}>
        <body>{children}</body>
      </Suspense>
    </html>
  );
}
