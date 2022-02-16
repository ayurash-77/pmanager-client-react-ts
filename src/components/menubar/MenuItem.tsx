import styled from 'styled-components'
import { FC } from 'react'
import { aSnapshotColor } from 'jest-snapshot/build/printSnapshot'
import { appColors } from '../../app/App.colors'

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
  color: ${p => (p.isSelected ? appColors.menubar.FG_SELECTED : appColors.main.FG)};
  background: ${p => p.isSelected && appColors.menubar.BG_SELECTED};

  &:hover {
    color: ${p => (p.isSelected ? appColors.menubar.FG_SELECTED : appColors.menubar.FG_HOVER)};
  }

  &:active {
    color: ${appColors.menubar.FG_PRESSED};
    background: ${appColors.menubar.BG_PRESSED};
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
