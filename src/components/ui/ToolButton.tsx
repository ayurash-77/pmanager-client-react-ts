import styled from 'styled-components'
import { FC } from 'react'
import { appColors } from '../../app/App.colors'

const marginLeft = p => (p.marginLeft || p.rounded === 'left' || p.rounded === 'all' ? '9px' : '1px')
const marginRight = p => (p.marginRight ? '9px' : '0')
const borderRadius = p => {
  switch (p.rounded) {
    case 'left':
      return '4px 0 0 4px'
    case 'right':
      return '0 4px 4px 0'
    case 'none':
      return '0'
    default:
      return '4px'
  }
}

interface IToolButton {
  icon: JSX.Element
  onClick: any
  selected?: boolean
  rounded?: 'left' | 'right' | 'none' | 'all' | null
  noBg?: boolean
  marginRight?: any
  marginLeft?: any
}

const Container = styled.div<IToolButton>`
  transition: color 150ms;
  height: 22px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${borderRadius};
  margin-left: ${marginLeft};
  margin-right: ${marginRight};
  cursor: default;

  color: ${p => (p.selected ? appColors.buttons.FG_SELECTED : appColors.buttons.FG)};
  background: ${p => (p.selected ? appColors.buttons.BG_SELECTED : appColors.buttons.BG)};

  &:hover {
    color: ${p => (p.selected ? '' : appColors.buttons.FG_HOVER)};
  }

  &:active {
    color: ${p => (p.selected ? '' : appColors.buttons.FG_PRESSED)};
    background: ${p => (p.selected ? '' : appColors.buttons.BG_PRESSED)};
  }
`

export const ToolButton: FC<IToolButton> = ({ ...props }) => {
  return <Container {...props}>{props.icon}</Container>
}
