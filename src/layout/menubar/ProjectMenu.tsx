import { FC, useEffect, useState } from 'react'
import { IMenuItem, MenuItem } from './MenuItem'

import * as SideIcons from '../../assets/icons/menubar-icons'

import { useTranslate } from '../../hooks/useTranslate'
import { useGetAllProjectsQuery, useGetProjectByIdQuery } from '../../store/api/projects.api'
import Loader from '../../components/ui/Loader'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useParams } from 'react-router'
import { setActiveMenu } from '../../store/reducers/ui.reducer'
import { setActiveReelId, setActiveReelsTypeId, setActiveShotId } from '../../store/reducers/entities.reducer'

export const ProjectMenu: FC<Partial<IMenuItem>> = () => {
  const { text } = useTranslate()

  const { expanded: menubarExpanded } = useAppSelector(state => state.ui.menubar)
  const { data: projects = [], isLoading: isLoadingProjects } = useGetAllProjectsQuery()
  const { activeProjectId } = useAppSelector(state => state.projects)
  const { data: project, isLoading: isLoadingProject } = useGetProjectByIdQuery(activeProjectId)

  const projectsCount = isLoadingProjects ? <Loader size={16} translateX={4} /> : projects.length
  const reelsCount = isLoadingProject ? <Loader size={16} translateX={4} /> : project?.reels?.length
  const shotsCount = isLoadingProject ? <Loader size={16} translateX={4} /> : project?.shots?.length

  const mainMenuButtons: IMenuItem[] = [
    { icon: <SideIcons.Home />, name: text.menu.allProjects, count: projectsCount, link: '/projects' },
    { icon: <SideIcons.Project />, name: text.menu.overview, link: `overview` },
    // { icon: <SideIcons.Reels />, name: text.menu.reelsTypes, count: 2, link: 'reelsTypes' },
    { icon: <SideIcons.Sequence />, name: text.menu.reels, count: reelsCount, link: 'reels' },
    { icon: <SideIcons.Shot />, name: text.menu.shots, count: shotsCount, link: 'shots' },
    { icon: <SideIcons.Check />, name: text.menu.tasks, count: 20, link: 'tasks' },
    { icon: <SideIcons.Graph />, name: text.menu.graph, link: 'graph' },
    { icon: <SideIcons.Stuff />, name: text.menu.stuff, count: 13, link: 'stuff' },
    { icon: <SideIcons.People />, name: text.menu.team, count: 3, link: 'team' },
  ]

  const { pathname } = useLocation()

  const { activeMenu } = useAppSelector(state => state.ui.menubar)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleMenuItemClick = link => {
    dispatch(setActiveMenu(link))
    dispatch(setActiveReelsTypeId(null))
    dispatch(setActiveReelId(null))
    dispatch(setActiveShotId(null))

    if (activeMenu !== link) {
      navigate(`project/${activeProjectId}/${link}`)
    }
  }

  return (
    <div>
      {mainMenuButtons.map(item => (
        <MenuItem
          key={item.link}
          menubarExpanded={menubarExpanded}
          onClick={() => handleMenuItemClick(item.link)}
          name={item.name}
          icon={item.icon}
          count={item.count}
          isSelected={activeMenu === item.link}
        />
      ))}
    </div>
  )
}
