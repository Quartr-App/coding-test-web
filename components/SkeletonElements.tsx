import styled from "styled-components"

import { randomInt } from "../utils/maths"

const SkeletonShimmer = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: lightgray;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 5s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`

export const SkeletonTitle = styled(SkeletonShimmer)`
  height: 1rem;
  width: ${() => randomInt(2, 6)}rem;
  min-width: 2rem;
`

export const SkeletonSmall = styled(SkeletonShimmer)`
  height: 0.25rem;
  width: ${() => randomInt(10, 20)}rem;
  min-width: 10rem;
`

export const SkeletonIcon = styled(SkeletonShimmer)`
  height: 40px;
  width: 40px;
  min-width: 40px;
  border-radius: 0.5rem;
`
