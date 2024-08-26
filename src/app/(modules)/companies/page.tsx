import { CompanyCellList } from "@/companies/components"

export default function Companies() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:py-12 md:py-12 py-8 flex flex-col gap-4">
      <p className="text-muted-foreground font-light">Trending companies</p>
      <CompanyCellList />
    </main>
  )
}
