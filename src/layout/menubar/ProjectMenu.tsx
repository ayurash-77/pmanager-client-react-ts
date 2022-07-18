import { skipToken } from '@reduxjs/toolkit/query'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import * as SideIcons from '../../assets/icons/menubar-icons'
import { Loader } from '../../components/ui'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useTranslate } from '../../hooks/useTranslate'
import { useGetProjectQuery, useGetProjectsQuery } from '../../store/api/projects.api'
import { useGetReelsQuery } from '../../store/api/reels.api'
import { useGetReelsTypesQuery } from '../../store/api/reelsTypes.api'
import { useGetShotsQuery } from '../../store/api/shots.api'
import {
  setActiveReelsIds,
  setActiveReelsTypeId,
  setActiveShotId,
} from '../../store/reducers/entities.reducer'
import { setActiveMenu } from '../../store/reducers/ui.reducer'
import { IMenuItem, MenuItem } from './MenuItem'

export const ProjectMenu: FC<Partial<IMenuItem>> = () => {
  const { text } = useTranslate()

  const { expanded: menubarExpanded } = useAppSelector(state => state.ui.menubar)
  const { data: projects = [], isLoading: isLoadingProjects } = useGetProjectsQuery()
  const { activeProjectId } = useAppSelector(state => state.entities)
  const { data: project, isLoading: isLoadingProject } = useGetProjectQuery(activeProjectId ?? skipToken)
  const { data: reels, isLoading: isLoadingReels } = useGetReelsQuery(activeProjectId ?? skipToken)
  const { data: reelsTypes, isLoading: isLoadingReelsTypes } = useGetReelsTypesQuery(
    activeProjectId ?? skipToken
  )
  const { data: shots, isLoading: isLoadingShots } = useGetShotsQuery(activeProjectId ?? skipToken)

  const projectsCount = isLoadingProjects ? <Loader size={16} translateX={4} /> : projects.length
  const reelsCount = isLoadingReels ? <Loader size={16} translateX={4} /> : reels?.length
  const reelsTypesCount = isLoadingReelsTypes ? <Loader size={16} translateX={4} /> : reelsTypes?.length
  const shotsCount = isLoadingShots ? <Loader size={16} translateX={4} /> : shots?.length

  const mainMenuButtons: IMenuItem[] = [
    { icon: <SideIcons.Projects />, name: text.menu.allProjects, count: projectsCount, link: 'projects' },
    // { icon: <SideIcons.Project />, name: text.menu.overview, link: `overview` },
    { icon: <SideIcons.Sequence />, name: text.menu.reels, count: reelsCount, link: 'reels' },
    { icon: <SideIcons.Reels />, name: text.menu.reelsTypes, count: reelsTypesCount, link: 'reelsTypes' },
    { icon: <SideIcons.Shot />, name: text.menu.shots, count: shotsCount, link: 'shots' },
    { icon: <SideIcons.Check />, name: text.menu.tasks, count: 20, link: 'tasks' },
    { icon: <SideIcons.Graph />, name: text.menu.graph, link: 'graph' },
    { icon: <SideIcons.Stuff />, name: text.menu.stuff, count: 13, link: 'stuff' },
    { icon: <SideIcons.People />, name: text.menu.team, count: 3, link: 'team' },
  ]

  const { activeMenu } = useAppSelector(state => state.ui.menubar)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleMenuItemClick = link => {
    dispatch(setActiveMenu(link))
    dispatch(setActiveReelsTypeId(null))
    dispatch(setActiveReelsIds([]))
    dispatch(setActiveShotId(null))

    if (activeMenu !== link) {
      navigate(`projects/${activeProjectId}/${link}`)
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
