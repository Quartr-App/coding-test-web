import { Footer, Header } from "@/components/core"

export const metadata = {
  title: "Trending Companies"
}

export default function CompaniesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
