"use client"

import { CompanyCell, CompanyCellSkeleton } from "@/companies/components"
import { SKELETON_COUNT } from "@/companies/constants"
import { Company } from "@/companies/types"
import apiClient from "@/libs/api-client"
import { useQuery } from "@tanstack/react-query"
import { ArchiveX } from "lucide-react"

export function CompanyCellList() {
  async function fetchCompanies(): Promise<Company[]> {
    const companies = await apiClient.get<Company[]>("/companies")
    return companies
  }

  const {
    data: companies,
    error,
    isLoading
  } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies
  })

  return (
    <section className="flex flex-col">
      {isLoading && Array.from({ length: SKELETON_COUNT }).map((_, index) => <CompanyCellSkeleton key={index} />)}
      {error && <p className="text-sm font-light text-red-500 mb-4">{error instanceof Error ? error.message : "An error occurred"}</p>}
      {(companies?.length ?? 0) > 0
        ? companies?.map((company) => <CompanyCell key={company.companyId} company={company} />)
        : !isLoading && (
            <div className="flex flex-col items-center justify-center gap-2 mt-8">
              <ArchiveX className="w-4 h-4" />
              <p className="font-light text-xs">No companies found.</p>
            </div>
          )}
    </section>
  )
}
