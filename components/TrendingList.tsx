import styled from "styled-components"

import { FunctionComponent as FC, PropsWithChildren as Props } from "react"
import { Skeleton } from "boneyard-js/react"

import { CompanyRows } from "./CompanyRow"
import { useCompanies } from "../hooks/useCompanies"
import { SubsectionHeading } from "./typography"
import { CompanyRowsSkeleton } from "./CompanyRowSkeleton"
import { ErrorMessage } from "./ErrorMessage"

export interface TrendingCompaniesProps {}

const TrendingCompaniesContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
`

export const TrendingCompanies: FC<Props<TrendingCompaniesProps>> = ({ }) => {
  const [companiesData, fetchingCompanies, errorMessage, retryRequest] = useCompanies();

  return (
    <TrendingCompaniesContainer>
      <SubsectionHeading>Trending companies</SubsectionHeading>

      <br />

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {!errorMessage && (fetchingCompanies || !companiesData.length) && <CompanyRowsSkeleton /> }

      {!errorMessage && !!companiesData.length && <CompanyRows companies={companiesData} /> }
    </TrendingCompaniesContainer>
  )
}
