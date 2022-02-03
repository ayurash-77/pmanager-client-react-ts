import { FC, useState } from 'react'
import { MenuItem } from './MenuItem'

import * as SideIcons from '../../assets/icons/menubar-icons'

import { useTranslate } from '../../hooks/useTranslate'
import { useGetAllProjectsQuery } from '../../services/projectsApi'
import Loader from '../ui/Loader'
import { quartersFilter } from '../../tools/quarter-filter'

interface Props {
  isMenubarExpanded: boolean
}

export const MainMenu: FC<Props> = ({ isMenubarExpanded }) => {
  const { text } = useTranslate()
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(text.menu.allProjects)

  const { data: projects = [], isLoading: isLoadingProjects } = useGetAllProjectsQuery(
    {},
    { pollingInterval: 50000 }
  )

  const quarterData = quartersFilter(projects)

  const quarterMenu = quarterData.map(item => (
    <div key={item.quarter}>
      {item.quarter} {item.count}
    </div>
  ))

  const handleMenuItemClick = (name: string) => {
    setSelectedMenuItem(name)
  }

  return (
    <>
      <MenuItem
        onClick={() => handleMenuItemClick(text.menu.allProjects)}
        icon={<SideIcons.Home />}
        name={text.menu.allProjects}
        count={isLoadingProjects ? <Loader size={16} translateX={4} /> : projects.length}
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
      {quarterMenu}
    </>
  )
}
