import { Suspense } from "react";
import { CompaniesList } from "@/components/CompaniesList";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 pb-10">
      <header className="py-4">
        <h1 className="text-2xl">Quartr</h1>
      </header>
      <section aria-labelledby="trending-companies-heading">
        <h2 id="trending-companies-heading" className="text-gray-500 my-2">
          Trending companies
        </h2>
        <Suspense
          fallback={
            <div role="status" aria-live="polite" className="py-6">
              Loading companies…
            </div>
          }
        >
          <CompaniesList />
        </Suspense>
      </section>
    </main>
  );
}
