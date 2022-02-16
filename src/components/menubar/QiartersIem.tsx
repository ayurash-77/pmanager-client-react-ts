import styled from 'styled-components'
import { FC } from 'react'
import { appColors } from '../../app/App.colors'

interface Prop {
  onClick?: () => void
  isSelected?: boolean
  isMenubarExpanded?: boolean
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
  color: ${p => (p?.isSelected ? appColors.menubar.FG_HOVER : appColors.main.FG)};
  overflow: hidden;

  background: ${p => (p.isSelected ? appColors.menubar.SUBMENU_BG_SELECTED : appColors.menubar.SUBMENU_BG1)};

  &:hover {
    color: ${p => !p.isSelected && appColors.menubar.FG_HOVER};
  }

  &:active {
    background: ${appColors.menubar.SUBMENU_BG_SELECTED};
  }
`

const Text = styled.div<Prop>`
  transition: margin 250ms, color 200ms;
  white-space: nowrap;
  text-wrap: none;
  font-weight: 600;
  overflow: hidden;
  margin-left: ${p => (p?.isMenubarExpanded ? '5px' : '1px')};
  font-size: var(--font-size-small1);
`
const Count = styled.div<Prop>`
  font-weight: 500;
  margin-left: auto;
  opacity: ${p => (p?.isMenubarExpanded ? '1' : '0')};
  width: ${p => (p?.isMenubarExpanded ? 'auto' : '0')};
`

interface IQuartersItem extends Prop {
  quarter?: string
  count?: number
}

export const QuartersItem: FC<IQuartersItem> = props => (
  <MenuItem isSelected={props.isSelected} onClick={props.onClick}>
    <Text isMenubarExpanded={props.isMenubarExpanded}>{props.quarter}</Text>
    <Count isMenubarExpanded={props.isMenubarExpanded}>{props.count}</Count>
  </MenuItem>
)
