import { Inter } from "@next/font/google";
import Dashboard from "./components/Dashboard";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-4">
        <h2 className="title">Quartr</h2>
      </div>
      <Dashboard />
    </main>
  );
}
