import { CompanyCellList } from "@/companies/components"

export default function Companies() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:py-16 md:py-16 py-8 flex flex-col gap-3">
      <h3 className="lg:text-2xl md:text-2xl text-xl font-medium -mt-[6px]">Companies</h3>
      <div className="w-full h-px bg-border lg:mb-6 md:mb-6 mb-3"></div>
      <p className="text-muted-foreground font-light">Trending companies</p>
      <CompanyCellList />
    </main>
  )
}
