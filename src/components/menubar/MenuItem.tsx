import styled from 'styled-components'
import { FC } from 'react'

export interface IMenuItem {
  icon: JSX.Element
  name: string
  count?: number | JSX.Element
  onClick?: () => void
  isSelected?: boolean
  isMenubarExpanded?: boolean
}

const MenuItemContainer = styled.div<IMenuItem>`
  transition: color 200ms;
  height: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 0 6px;
  color: ${p => (p.isSelected ? 'var(--navbar-fg-selected)' : 'var(--fg-normal)')};
  background: ${p => p.isSelected && 'var(--navbar-bg-selected)'};

  &:hover {
    color: ${p => (p.isSelected ? 'var(--navbar-fg-selected)' : 'var(--navbar-fg-hover)')};
  }

  &:active {
    color: var(--navbar-fg-pressed);
    background: var(--navbar-bg-pressed);
  }

  cursor: default;
  user-select: none;
  z-index: 2;
`

const Icon = styled.div`
  width: 24px;
  height: 24px;
`

const Text = styled.span<IMenuItem>`
  transition: opacity 250ms, margin-left 250ms;
  font-weight: 500;
  margin-left: ${p => (p.isMenubarExpanded ? '6px' : '0')};
  position: absolute;
  left: 42px;
  opacity: ${p => (p.isMenubarExpanded ? '1' : '0')};
  z-index: 0;
`

const Count = styled.div<IMenuItem>`
  transition: opacity 250ms;
  font-weight: 500;
  margin-left: auto;
  opacity: ${p => (p.isMenubarExpanded ? '1' : '0')};
  width: ${p => (p.isMenubarExpanded ? 'auto' : '0')};
`

export const MenuItem: FC<IMenuItem> = ({ ...props }) => (
  <MenuItemContainer {...props}>
    <Icon>{props.icon}</Icon>
    <Text {...props}>{props.name}</Text>
    <Count {...props}>{props.count}</Count>
  </MenuItemContainer>
)

export default MenuItem
