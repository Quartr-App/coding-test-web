"use client"

import { CompanyCell, CompanyCellSkeleton } from "@/companies/components"
import { SKELETON_COUNT } from "@/companies/constants"
import { Company } from "@/companies/types"
import apiClient from "@/libs/api-client"
import { useQuery } from "@tanstack/react-query"

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
      {error && <p className="text-red-500">{error instanceof Error ? error.message : "An error occurred"}</p>}
      {(companies?.length ?? 0) > 0 && companies?.map((company) => <CompanyCell key={company.companyId} company={company} />)}
    </section>
  )
}
