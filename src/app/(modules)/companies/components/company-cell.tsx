"use client"

import { CompanyCellProps } from "@/companies/types"
import { ChevronRight, ImageOff } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function CompanyCell({ company }: CompanyCellProps) {
  const [hovered, setHovered] = useState<boolean>(false)

  return (
    <button data-testid="company-cell" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={`flex flex-row items-center gap-4 p-3 pr-1 border-b ${hovered ? "bg-muted/30" : ""}`}>
      <div style={{ backgroundColor: company.iconUrl ? company.colorSettings?.brandColor : "hsl(var(--muted))" }} className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center overflow-hidden ${company.iconUrl ? "shadow" : "bg-muted"}`}>
        {company.iconUrl ? <Image src={company.iconUrl} alt={company.companyName} width={48} height={48} className="w-10 h-10 flex-shrink-0 object-contain" priority={true} /> : <ImageOff className="w-4 h-4" />}
      </div>
      <div className="flex items-start text-start w-full flex-col gap-1 min-w-0">
        <p className="text-sm">
          {company.displayName} <span className="ml-1 text-muted-foreground">{company.companyTicker}</span>
        </p>
        <p className="text-xs font-light text-muted-foreground overflow-hidden text-ellipsis w-full" style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
          {company.description}
        </p>
      </div>
      <ChevronRight strokeWidth={1} className={`flex-shrink-0 transition w-6 h-6 ${hovered ? "text-foreground" : "text-muted-foreground"}`} />
    </button>
  )
}
