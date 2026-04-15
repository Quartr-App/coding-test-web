import styled from "styled-components"

import type { Company } from "../types/company"

import { FunctionComponent as FC, PropsWithChildren as Props } from "react"

import { InterSubheading, TitleHeading, TitleSmall } from "./typography"

export type CompanyRowProps = Pick<Company, "infoUrl" | "iconUrl" | "companyName" | "description">

const companyNameInitials = (companyName: string) => {
  const nameParts = companyName.split(" ")

  const firstInitial = nameParts.at(0)?.at(0) ?? ""

  const additionalText = nameParts.at(-1) ? ` ${nameParts.at(-1)?.at(0)}` : nameParts.at(0)?.slice(1, 3)

  return firstInitial + additionalText
}

const CompanyListItemRow = styled.a`
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

const CompanyListItemIcon = styled.div`
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

const CompanyListItemRowText = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
  margin-right: auto;

  white-space: nowrap;
  overflow: hidden;
  max-width: 640px;
`

const CompanyListItemChevron = styled(InterSubheading)`
  color: silver;
`

export const CompanyRow: FC<Props<CompanyRowProps>> = ({ infoUrl, iconUrl, companyName, description }) =>
  <CompanyListItemRow href={infoUrl} target="_blank" rel="noopener noreferrer">
    <CompanyListItemIcon>
      {iconUrl
        ? <img src={iconUrl} alt={`${companyName} icon`} />
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

