import styled from "styled-components"

import { FunctionComponent as FC, PropsWithChildren as Props } from "react"
import { Skeleton } from "boneyard-js/react"

import { CompanyRows } from "./CompanyRow"
import { useCompanies } from "../hooks/useCompanies"
import { SubsectionHeading } from "./typography"

export type TrendingCompaniesProps = {}

const TrendingCompaniesContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`

export const TrendingCompanies: FC<Props<TrendingCompaniesProps>> = ({ }) => {
  const [companiesData, fetchingCompanies, errorMessage, retryRequest] = useCompanies();

  return (
    <TrendingCompaniesContainer>
      <SubsectionHeading>Trending companies</SubsectionHeading>

      <Skeleton name="trending-companies" loading={fetchingCompanies}>
        <CompanyRows companies={companiesData} />
      </Skeleton>
    </TrendingCompaniesContainer>
  )
}
