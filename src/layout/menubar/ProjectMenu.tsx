import { FC, useState } from 'react'
import { IMenuItem, MenuItem } from './MenuItem'

import * as SideIcons from '../../assets/icons/menubar-icons'

import { useTranslate } from '../../hooks/useTranslate'
import { useGetAllProjectsQuery } from '../../store/api/projects.api'
import Loader from '../../components/ui/Loader'
import { useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'

export const ProjectMenu: FC<Partial<IMenuItem>> = ({ menubarExpanded }) => {
  const { text } = useTranslate()
  const [selectedMenuItem, setSelectedMenuItem] = useState(1)

  const navigate = useNavigate()
  const { data: projects = [], isLoading: isLoadingProjects } = useGetAllProjectsQuery({})
  const { activeProjectId } = useAppSelector(state => state.projects)

  const handleMenuItemClick = (idx, link) => {
    setSelectedMenuItem(idx)
    if (selectedMenuItem !== idx) {
      idx === 0 ? navigate('/', { state: 0 }) : navigate(`project/${activeProjectId}/${link}`, { state: 1 })
    }
  }
  const projectsCount = isLoadingProjects ? <Loader size={16} translateX={4} /> : projects.length

  const mainMenuButtons: IMenuItem[] = [
    { icon: <SideIcons.Home />, name: text.menu.allProjects, count: projectsCount, link: '/' },
    { icon: <SideIcons.Project />, name: text.menu.overview, link: `overview` },
    { icon: <SideIcons.Reels />, name: text.menu.reelsTypes, count: 2, link: 'reelsTypes' },
    { icon: <SideIcons.Sequence />, name: text.menu.reels, count: 4, link: 'reels' },
    { icon: <SideIcons.Shot />, name: text.menu.shots, count: 12, link: 'shots' },
    { icon: <SideIcons.Check />, name: text.menu.tasks, count: 20, link: 'tasks' },
    { icon: <SideIcons.Graph />, name: text.menu.graph, link: 'graph' },
    { icon: <SideIcons.Stuff />, name: text.menu.stuff, count: 13, link: 'stuff' },
    { icon: <SideIcons.People />, name: text.menu.team, count: 3, link: 'team' },
  ]
  return (
    <div>
      {mainMenuButtons.map((item, idx) => (
        <MenuItem
          key={idx}
          menubarExpanded={menubarExpanded}
          onClick={() => handleMenuItemClick(idx, item.link)}
          name={item.name}
          icon={item.icon}
          count={item.count}
          isSelected={selectedMenuItem === idx}
        />
      ))}
    </div>
  )
}
