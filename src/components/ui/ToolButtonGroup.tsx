import { ReactNode } from 'react'
import styled from 'styled-components'

interface IToolButtonGroup {
  children: ReactNode
}

const IToolButtonGroupStyled = styled.div`
  display: flex;
  gap: 1px;
  & > :first-child {
    border-top-left-radius: var(--rad);
    border-bottom-left-radius: var(--rad);
  }
  & > :last-child {
    border-top-right-radius: var(--rad);
    border-bottom-right-radius: var(--rad);
  }
`

export const ToolButtonGroup = ({ children }: IToolButtonGroup): JSX.Element => {
  return (
    <>
      <IToolButtonGroupStyled>{children}</IToolButtonGroupStyled>
    </>
  )
}
