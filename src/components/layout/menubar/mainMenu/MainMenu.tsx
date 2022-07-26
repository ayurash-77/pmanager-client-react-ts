import { FC, useState } from 'react'
import * as SideIcons from '../../../../assets/icons/menubar-icons'
import { useGetProjectsQuery } from '../../../../entities/projects/projects.api'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { useTranslate } from '../../../../hooks/useTranslate'
import { setQuarterFilter } from '../../../../store/reducers/projects.reducer'
import { Loader } from '../../../ui'
import { MenuItem } from '../menuItem/MenuItem'
import { IMenuItem } from '../menuItem/menuItem.interfaces'
import { QuartersMenu } from './quartersMenu/QuartersMenu'

export const MainMenu: FC = () => {
  const { text } = useTranslate()
  const [selectedMenuItem, setSelectedMenuItem] = useState(0)

  const { data: projects = [], isLoading: isLoadingProjects } = useGetProjectsQuery()
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

      <QuartersMenu isMenuShow={selectedMenuItem === 4} />
    </div>
  )
}
