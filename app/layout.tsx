import "./styles/globals.scss";
import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
    <head />
    <body>
      <div className="header">
      <Link href="/"><h1 className={inter.className}>Quartr</h1></Link>
      </div>
    {children}
    </body>
    </html>
  );
}
