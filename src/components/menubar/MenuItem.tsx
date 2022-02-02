import styled, { StyledComponent } from 'styled-components'
import { Dispatch, FC, ReactElement } from 'react'

interface Props {
  isSelected: boolean
  isMenubarExpanded: boolean
}

interface PropsMenuItem extends Props {
  onClick: Dispatch<any>
  name: string
  icon: ReactElement
  count?: number | JSX.Element
}

const MenuItemContainer: any = styled.div<Props>`
  transition: all 200ms;
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

const Text: StyledComponent<any, any> = styled.span<Props>`
  transition: opacity 250ms, margin-left 250ms;
  font-weight: 500;
  margin-left: ${p => (p.isMenubarExpanded ? '6px' : '0')};
  position: absolute;
  left: 42px;
  opacity: ${p => (p.isMenubarExpanded ? '1' : '0')};
  z-index: 0;
`

const Count: StyledComponent<any, any> = styled.div<Props>`
  transition: opacity 250ms;
  font-weight: 500;
  margin-left: auto;
  opacity: ${p => (p.isMenubarExpanded ? '1' : '0')};
`

export const MenuItem: FC<PropsMenuItem> = ({ ...props }) => (
  <MenuItemContainer isSelected={props.isSelected} onClick={props.onClick}>
    <Icon>{props.icon}</Icon>
    <Text isMenubarExpanded={props.isMenubarExpanded}>{props.name}</Text>
    <Count isMenubarExpanded={props.isMenubarExpanded}>{props.count}</Count>
  </MenuItemContainer>
)

export default MenuItem
