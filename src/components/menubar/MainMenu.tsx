import { FC, useState } from 'react'
import { MenuItem } from './MenuItem'

import * as SideIcons from '../../assets/icons/menubar-icons'

import { useTranslate } from '../../hooks/useTranslate'

interface Props {
  isMenubarExpanded: boolean
}

export const MainMenu: FC<Props> = ({ isMenubarExpanded }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('allProjects')
  const { text } = useTranslate()

  const handleMenuItemClick = (name: string) => {
    setSelectedMenuItem(name)
  }

  return (
    <>
      <MenuItem
        onClick={() => handleMenuItemClick(text.menu.allProjects)}
        icon={<SideIcons.Home />}
        name={text.menu.allProjects}
        count={11}
        isSelected={selectedMenuItem === text.menu.allProjects}
        isMenubarExpanded={isMenubarExpanded}
      />
      <MenuItem
        onClick={() => handleMenuItemClick(text.menu.favorites)}
        icon={<SideIcons.Star />}
        name={text.menu.favorites}
        count={5}
        isSelected={selectedMenuItem === text.menu.favorites}
        isMenubarExpanded={isMenubarExpanded}
      />
      <MenuItem
        onClick={() => handleMenuItemClick(text.menu.lastActivity)}
        icon={<SideIcons.Update />}
        name={text.menu.lastActivity}
        count={5}
        isSelected={selectedMenuItem === text.menu.lastActivity}
        isMenubarExpanded={isMenubarExpanded}
      />
      <MenuItem
        onClick={() => handleMenuItemClick(text.menu.lastAdded)}
        icon={<SideIcons.Clock />}
        name={text.menu.lastAdded}
        count={5}
        isSelected={selectedMenuItem === text.menu.lastAdded}
        isMenubarExpanded={isMenubarExpanded}
      />
      <MenuItem
        onClick={() => handleMenuItemClick(text.menu.byDate)}
        icon={<SideIcons.Calendar />}
        name={text.menu.byDate}
        count={5}
        isSelected={selectedMenuItem === text.menu.byDate}
        isMenubarExpanded={isMenubarExpanded}
      />
    </>
  )
}
