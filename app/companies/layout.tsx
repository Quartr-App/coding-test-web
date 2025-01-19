import { Inter } from "next/font/google";
import { BackButton } from "@/app/ui";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <h2 className={inter.className}>Quartr</h2>
      <p className={inter.className}>Trending companies</p>
      <div>{children}</div>

      <BackButton />
    </main>
  );
}
