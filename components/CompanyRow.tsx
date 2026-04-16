import styled from "styled-components"

import type { Company } from "../types/company"

import { FunctionComponent as FC, PropsWithChildren as Props } from "react"
import { Image } from "next/image"

import { InterSubheading, TitleHeading, TitleSmall } from "./typography"
import { companyNameInitials } from "../utils/string"

export type CompanyRowProps = Pick<Company, "infoUrl" | "iconUrl" | "companyName" | "description">

export const CompanyListItemRow = styled.a`
  display: flex;
  gap: 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  height: 4rem;

  & + & {
    border-top: 1px silver solid;
  }

  &:last-child {
    border-bottom: 1px silver solid;
  }
`

export const CompanyListItemIcon = styled.div`
  color: dimgray;
  border-radius: 0.5rem;
  background-color: lightgray;
  width: 40px;
  height: 40px;
  min-width: 40px;
  text-align: center;
  line-height: 40px;
  padding:  0.125rem;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const CompanyListItemRowText = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
  margin-right: auto;

  white-space: nowrap;
  overflow: hidden;
  max-width: 640px;
`

export const CompanyListItemChevron = styled(InterSubheading)`
  color: silver;
`

export const CompanyRow: FC<Props<CompanyRowProps>> = ({ infoUrl, iconUrl, companyName, description }) =>
  <CompanyListItemRow href={infoUrl} target="_blank" rel="noopener noreferrer">
    <CompanyListItemIcon>
      {iconUrl
        ? <Image src={iconUrl} alt={`${companyName} icon`} />
        : <InterSubheading>{companyNameInitials(companyName)}</InterSubheading>
      }
    </CompanyListItemIcon>
    <CompanyListItemRowText>
      <TitleHeading>{companyName}</TitleHeading>
      <TitleSmall>{description}</TitleSmall>
    </CompanyListItemRowText>
    <CompanyListItemChevron>
      ›
    </CompanyListItemChevron>
  </CompanyListItemRow>

export const CompanyRows: FC<Props<{ companies: CompanyRowProps[] }>> = ({ companies }) =>
  <>
    {companies.map(({ infoUrl, iconUrl, companyName, description }) =>
      <CompanyRow
        key={companyName}
        infoUrl={infoUrl}
        iconUrl={iconUrl}
        description={description}
        companyName={companyName} />
    )}
  </>

