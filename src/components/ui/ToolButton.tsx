import styled from 'styled-components'
import { FC } from 'react'

const marginLeft = p => (p.rounded === 'left' || p.rounded === 'all' ? '9px' : '1px')
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
  rounded?: any
  noBg?: boolean
  marginRight?: any
}

const ToolButtonStyled = styled.div<IToolButton>`
  transition: all 150ms;
  height: 22px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${borderRadius};
  margin-left: ${marginLeft};
  margin-right: ${marginRight};
  cursor: default;

  color: ${p => (p.selected ? 'var(--btn-fg-selected)' : 'var(--btn-fg-normal)')};
  background: ${p => (p.selected ? 'var(--btn-bg-selected)' : 'var(--btn-bg-normal)')};

  &:hover {
    ${p => (p.selected ? '' : 'color: var(--btn-fg-hover);')}
  }

  &:active {
    ${p => (p.selected ? '' : 'color: var(--btn-fg-pressed);')}
    ${p => (p.selected ? '' : 'background: var(--btn-bg-pressed);')}
  }
`

export const ToolButton: FC<IToolButton> = ({ ...props }) => {
  return <ToolButtonStyled {...props}>{props.icon}</ToolButtonStyled>
}
