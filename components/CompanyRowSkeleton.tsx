import styled from "styled-components"

import { FunctionComponent as FC, PropsWithChildren as Props } from "react"

import { SkeletonIcon, SkeletonSmall, SkeletonTitle } from "./SkeletonElements"
import { CompanyListItemRow, CompanyListItemRowText } from "./CompanyRow"

const CompanyListItemRowSkeleton = styled(CompanyListItemRow)``

const CompanyListItemRowTextSkeleton = styled(CompanyListItemRowText)``

export const CompanyRowSkeleton: FC<Props<{}>> = () =>
  <CompanyListItemRowSkeleton>
    <SkeletonIcon />
    <CompanyListItemRowTextSkeleton>
      <SkeletonTitle />
      <SkeletonSmall />
    </CompanyListItemRowTextSkeleton>
  </CompanyListItemRowSkeleton>

export const CompanyRowsSkeleton: FC<Props<{}>> = () =>
  <>
    {Array.from({ length: 3 }, () => <CompanyRowSkeleton key={Math.random()} />)}
  </>

