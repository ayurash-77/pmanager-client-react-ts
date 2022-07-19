import { FC } from 'react'
import styled from 'styled-components'

interface Prop {
  onClick?: () => void
  isSelected?: boolean
  menubarExpanded?: boolean
}

const MenuItem = styled.div<Prop>`
  transition: background-color 100ms;
  cursor: default;
  user-select: none;
  height: 21px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 3px 3px;
  border-radius: 3px;
  color: ${p => (p?.isSelected ? 'var(--menubar-fg-selected)' : 'var(--main-fg)')};
  overflow: hidden;

  background: ${p => (p.isSelected ? 'var(--menubar-bg-selected)' : 'var(--menubar-submenu-bg1)')};

  &:hover {
    color: ${p => !p.isSelected && 'var(--menubar-fg-hover)'};
  }

  &:active {
    background: var(--menubar-bg-selected);
  }
`

const Text = styled.div<Prop>`
  transition: margin 250ms, color 200ms;
  white-space: nowrap;
  text-wrap: none;
  font-weight: 600;
  overflow: hidden;
  margin-left: ${p => (p?.menubarExpanded ? '5px' : '1px')};
  font-size: var(--fs-small1);
`
const Count = styled.div<Prop>`
  font-weight: 500;
  margin-left: auto;
  opacity: ${p => (p?.menubarExpanded ? '1' : '0')};
  width: ${p => (p?.menubarExpanded ? 'auto' : '0')};
`

interface IQuartersItem extends Prop {
  quarter?: string
  count?: number
}

export const QuartersItem: FC<IQuartersItem> = props => (
  <MenuItem isSelected={props.isSelected} onClick={props.onClick}>
    <Text menubarExpanded={props.menubarExpanded}>{props.quarter}</Text>
    <Count menubarExpanded={props.menubarExpanded}>{props.count}</Count>
  </MenuItem>
)
