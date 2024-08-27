import { Footer, Header } from "@/components/core"
import { CompaniesLayoutProps } from "@/companies/types"

export const metadata = {
  title: "Trending Companies"
}

export default function CompaniesLayout({ children }: CompaniesLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
