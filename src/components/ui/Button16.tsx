import styled from 'styled-components'
import { DetailedHTMLProps, Dispatch, FC, HTMLAttributes } from 'react'

interface IButtonStyled {
  marginLeft?: number
  marginRight?: number
}

const ToolButtonStyled = styled.div<IButtonStyled>`
  transition: all 150ms;
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

interface IButton16 extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon: JSX.Element
  action: Dispatch<any>
  marginLeft?: number
  marginRight?: number
}

export const Button16: FC<IButton16> = ({ ...props }: IButton16) => {
  return (
    <ToolButtonStyled onClick={props.action} marginLeft={props.marginLeft} marginRight={props.marginRight}>
      {props.icon}
    </ToolButtonStyled>
  )
}
