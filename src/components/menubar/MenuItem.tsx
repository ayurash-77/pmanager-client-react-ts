import styled from 'styled-components'
import { Dispatch, FC, ReactElement } from 'react'

interface Props {
  isSelected?: boolean
  isMenubarExpanded: boolean
}

interface PropsMenuItem extends Props {
  onClick: Dispatch<any>
  name: string
  icon: ReactElement
  count?: number | ReactElement
}

const MenuItemContainer = styled.div<Props>`
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

const Text = styled.span<Props>`
  transition: opacity 250ms, margin-left 250ms;
  font-weight: 500;
  margin-left: ${p => (p.isMenubarExpanded ? '6px' : '0')};
  position: absolute;
  left: 42px;
  opacity: ${p => (p.isMenubarExpanded ? '1' : '0')};
  z-index: 0;
`

const Count = styled.div<Props>`
  transition: opacity 250ms;
  font-weight: 500;
  margin-left: auto;
  opacity: ${p => (p.isMenubarExpanded ? '1' : '0')};
`

export const MenuItem: FC<PropsMenuItem> = ({ ...props }) => (
  <MenuItemContainer {...props}>
    <Icon>{props.icon}</Icon>
    <Text {...props}>{props.name}</Text>
    <Count {...props}>{props.count}</Count>
  </MenuItemContainer>
)

export default MenuItem
