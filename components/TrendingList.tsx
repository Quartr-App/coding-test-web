import styled from "styled-components"

import { FunctionComponent as FC, PropsWithChildren as Props } from "react"

import { CompanyRows } from "./CompanyRow"
import { useCompanies } from "../hooks/useCompanies"
import { SubsectionHeading } from "./typography"
import { SimpleSkeleton } from "./SimpleSkeleton"

import trendingCompaniesBones from "../bones/trending-companies.bones.json"

export type TrendingCompaniesProps = {}

const TrendingCompaniesContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`

export const TrendingCompanies: FC<Props<TrendingCompaniesProps>> = ({ }) => {
  const [companiesData, fetchingCompanies] = useCompanies();

  console.log('TrendingCompanies render:', {
    fetchingCompanies,
    companiesCount: companiesData.length,
    hasBones: !!trendingCompaniesBones,
    windowInnerWidth: typeof window !== 'undefined' ? window.innerWidth : 0
  });

  return (
    <TrendingCompaniesContainer>
      <SubsectionHeading>Trending companies</SubsectionHeading>

      <SimpleSkeleton
        loading={fetchingCompanies}
        bones={trendingCompaniesBones.breakpoints['1280'].bones as any}
        containerWidth={1024}
        containerHeight={320}
        stagger={80}
      >
        <CompanyRows companies={companiesData} />
      </SimpleSkeleton>
    </TrendingCompaniesContainer>
  )
}
