import { FC, useState } from 'react'
import { IMenuItem, MenuItem } from './MenuItem'

import * as SideIcons from '../../assets/icons/menubar-icons'

import { useTranslate } from '../../hooks/useTranslate'
import Loader from '../../components/ui/Loader'
import { QuartersMenu } from './QuartersMenu'
import { setQuarterFilter } from '../../store/reducers/projects.reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useGetProjects } from '../../hooks/api/useProjectsApi'

export const MainMenu: FC<Partial<IMenuItem>> = () => {
  const { text } = useTranslate()
  const [selectedMenuItem, setSelectedMenuItem] = useState(0)

  const { data: projects = [], isLoading: isLoadingProjects } = useGetProjects()
  const { expanded: menubarExpanded } = useAppSelector(state => state.ui.menubar)
  const { quarterFilter } = useAppSelector(state => state.projects)
  const dispatch = useAppDispatch()

  const handleMenuItemClick = index => {
    setSelectedMenuItem(index)
    dispatch(setQuarterFilter({ ...quarterFilter, isActive: index === 4 }))
  }
  const projectsCount = isLoadingProjects ? <Loader size={16} translateX={4} /> : projects.length

  const mainMenuButtons: IMenuItem[] = [
    { icon: <SideIcons.Projects />, name: text.menu.allProjects, count: projectsCount },
    { icon: <SideIcons.Star />, name: text.menu.favorites },
    { icon: <SideIcons.Update />, name: text.menu.lastActivity },
    { icon: <SideIcons.Clock />, name: text.menu.lastAdded },
    { icon: <SideIcons.Calendar />, name: text.menu.quarters, count: projectsCount },
  ]
  return (
    <div>
      {mainMenuButtons.map((item, index) => (
        <MenuItem
          menubarExpanded={menubarExpanded}
          key={index}
          onClick={() => handleMenuItemClick(index)}
          name={item.name}
          icon={item.icon}
          count={item.count}
          isSelected={selectedMenuItem === index}
        />
      ))}

      <QuartersMenu menubarExpanded={menubarExpanded} isMenuShow={selectedMenuItem === 4} />
    </div>
  )
}
