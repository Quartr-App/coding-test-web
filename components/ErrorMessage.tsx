import styled from "styled-components"

import { FunctionComponent as FC, PropsWithChildren as Props } from "react"
import { InterHeading, InterSmall, TextAnchor } from "./typography"

const ErrorMessageContainer = styled.div`
  background-color: salmon;
  border: 1px red solid;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ErrorMessageButton = styled(TextAnchor)`
  color: white;
  background-color: red;
  padding: 0.5rem;
  margin-right: auto;
  border-radius: 0.25rem;
`

export interface ErrorMessageProps {
  message: string
}

export const ErrorMessage: FC<Props<ErrorMessageProps>> = ({ message }) => {
  return (
    <ErrorMessageContainer>
      <InterHeading>
        Error:
      </InterHeading>

      <InterSmall>
        {message}
      </InterSmall>

      <ErrorMessageButton onClick={() => location.reload()}>
        Reload the Page
      </ErrorMessageButton>
    </ErrorMessageContainer>
  )
}
