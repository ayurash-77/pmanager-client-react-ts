import styled from 'styled-components'
import { Dispatch, FC } from 'react'
import { appColors } from '../../app/App.colors'

interface IButton16 {
  icon: JSX.Element
  onClick?: Dispatch<any>
  marginLeft?: number
  marginRight?: number
  disabled?: boolean
  size?: number
  accent?: boolean
}

const Container = styled.div<IButton16>`
  transition: all 150ms;
  height: ${p => p.size + 'px' || '16px'};
  width: ${p => p.size + 'px' || '16px'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${p => p.marginLeft + 'px'};
  margin-right: ${p => p.marginRight + 'px'};
  cursor: default;
  color: ${p => (p.accent ? appColors.main.ACCENT : appColors.buttons.FG)};
  opacity: ${p => (p.disabled ? 0.3 : p.accent ? 0.7 : 1)};

  &:hover {
    color: ${p => (p.disabled ? '' : p.accent ? appColors.main.ACCENT : appColors.buttons.FG_HOVER)};
    ${p => (p.disabled ? '' : 'opacity: 1')};
  }

  &:active {
    color: ${p => (p.disabled ? '' : p.accent ? appColors.main.ACCENT : appColors.buttons.FG_PRESSED)};
  }
`

export const Button16: FC<IButton16> = ({ ...props }) => {
  return <Container {...props}>{props.icon}</Container>
}
