import styled from 'styled-components'
import { Dispatch, FC } from 'react'

interface IButton16 {
  icon: JSX.Element
  onClick?: Dispatch<any>
  marginLeft?: number
  marginRight?: number
}

const Container = styled.div<IButton16>`
  transition: color 150ms;
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${p => p.marginLeft + 'px'};
  margin-right: ${p => p.marginRight + 'px'};
  cursor: default;
  color: var(--btn-fg-normal);

  &:hover {
    color: var(--btn-fg-hover);
  }

  &:active {
    color: var(--btn-fg-pressed);
  }
`

export const Button16: FC<IButton16> = ({ ...props }) => {
  return <Container {...props}>{props.icon}</Container>
}
