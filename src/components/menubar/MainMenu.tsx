import { FC, useState } from 'react'
import { IMenuItem, MenuItem } from './MenuItem'

import * as SideIcons from '../../assets/icons/menubar-icons'

import { useTranslate } from '../../hooks/useTranslate'
import { useGetAllProjectsQuery } from '../../store/api/projects.api'
import Loader from '../ui/Loader'
import { QuartersMenu } from './QuartersMenu'
import { setFiler } from '../../store/reducers/projects.reducer'
import { useAppDispatch } from '../../hooks/redux'

export const MainMenu: FC<Partial<IMenuItem>> = props => {
  const { text } = useTranslate()
  const [selectedMenuItem, setSelectedMenuItem] = useState(0)

  const { data: projects = [], isLoading: isLoadingProjects } = useGetAllProjectsQuery({})

  const dispatch = useAppDispatch()

  const handleMenuItemClick = index => {
    setSelectedMenuItem(index)
    dispatch(setFiler(index === 4))
  }
  const projectsCount = isLoadingProjects ? <Loader size={16} translateX={4} /> : projects.length

  const mainMenuButtons: IMenuItem[] = [
    { icon: <SideIcons.Home />, name: text.menu.allProjects, count: projectsCount },
    { icon: <SideIcons.Star />, name: text.menu.favorites },
    { icon: <SideIcons.Update />, name: text.menu.lastActivity },
    { icon: <SideIcons.Clock />, name: text.menu.lastAdded },
    { icon: <SideIcons.Calendar />, name: text.menu.quarters, count: projectsCount },
  ]
  return (
    <div>
      {mainMenuButtons.map((item, index) => (
        <MenuItem
          {...props}
          key={index}
          onClick={() => handleMenuItemClick(index)}
          name={item.name}
          icon={item.icon}
          count={item.count}
          isSelected={selectedMenuItem === index}
        />
      ))}

      <QuartersMenu isMenubarExpanded={props.isMenubarExpanded} isMenuShow={selectedMenuItem === 4} />
    </div>
  )
}
