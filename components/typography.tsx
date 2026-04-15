import styled from "styled-components";

import { Inter } from "@next/font/google";
import { TrendingCompanies } from "../components/TrendingList";
import { useCompanies } from "../hooks/useCompanies";

const inter = Inter({ subsets: ["latin"] });

export const InterHeading = styled.h4(inter.style) 
export const InterSubheading = styled.h5(inter.style) 
export const InterSmall = styled.small(inter.style) 
export const InterParagraph = styled.p(inter.style) 

export const SubsectionHeading = styled(InterSubheading)`
  color: silver;
`

export const TitleHeading = styled(InterHeading)`
  color: dimgray;
`

export const TitleSmall = styled(InterSmall)`
  color: silver;
`

export const TextParagraph = styled(InterParagraph)`
  color: dimgrey;
`
