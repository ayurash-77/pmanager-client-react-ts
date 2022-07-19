import cn from 'classnames'
import { FC, useState } from 'react'
import * as ToolbarIcons from '../../../assets/icons/toolbar-icons'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { IProject } from '../../../interfaces/IProject'
import { useGetBriefsQuery } from '../../../store/api/briefs.api'
import { useGetShotsQuery } from '../../../store/api/shots.api'
import { InfoProjectTitle } from '../../info-elements'
import { ToolButton, ToolButtonGroup } from '../../ui'
import css from './Sidebar.module.scss'
import SidebarBriefs from './sidebar-briefs/SidebarBriefs'
import SidebarInfo from './sidebar-info/SidebarInfo'
import { SidebarShots } from './sidebar-shots/SidebarShots'

interface ISidebar {
  project: IProject
  isLoadingProject?: boolean
}

////////////////////////////////////////////////////////////////////////
// Sidebar
////////////////////////////////////////////////////////////////////////

export const Sidebar: FC<ISidebar> = props => {
  const { project, isLoadingProject } = props
  const dispatch = useAppDispatch()
  const { show: sidebarShow } = useAppSelector(state => state.ui.sidebar)

  const [showSidebarInfo, setShowSidebarInfo] = useState(true)
  const [showSidebarBriefs, setShowSidebarBriefs] = useState(true)
  const [showSidebarReels, setShowSidebarReels] = useState(true)
  const [showSidebarTeam, setShowSidebarTeam] = useState(true)
  const [showSidebarStuff, setShowSidebarStuff] = useState(true)
  const [showSidebarShots, setShowSidebarShots] = useState(true)

  const { activeProjectId } = useAppSelector(state => state.entities)
  const { data: shots, isLoading: isLoadingShots } = useGetShotsQuery(activeProjectId)
  const { data: briefs, isLoading: isLoadingBriefs } = useGetBriefsQuery(activeProjectId)

  ////////////////////////////////////////////////////////////////////////

  return (
    <div className={cn(css.sideBarContainer, !sidebarShow && css.hide)}>
      <div className={css.toolbarContainer}>
        <ToolButtonGroup>
          <ToolButton
            icon={<ToolbarIcons.Info />}
            selected={showSidebarInfo}
            onClick={() => setShowSidebarInfo(prev => !prev)}
          />
          <ToolButton
            icon={<ToolbarIcons.Brief />}
            selected={showSidebarBriefs}
            onClick={() => setShowSidebarBriefs(prev => !prev)}
          />
          <ToolButton
            icon={<ToolbarIcons.Reel />}
            selected={showSidebarReels}
            onClick={() => setShowSidebarReels(prev => !prev)}
          />
          <ToolButton
            icon={<ToolbarIcons.User />}
            selected={showSidebarTeam}
            onClick={() => setShowSidebarTeam(prev => !prev)}
          />
          <ToolButton
            icon={<ToolbarIcons.Stuff />}
            selected={showSidebarStuff}
            onClick={() => setShowSidebarStuff(prev => !prev)}
          />
          <ToolButton
            icon={<ToolbarIcons.Shot />}
            selected={showSidebarShots}
            onClick={() => setShowSidebarShots(prev => !prev)}
          />
        </ToolButtonGroup>
      </div>
      <div className={css.body}>
        {project && (
          <InfoProjectTitle
            margin={8}
            title={project.title}
            highPriority={project.highPriority}
            align={'center'}
            status={project.status}
          />
        )}

        {showSidebarInfo && project && <SidebarInfo project={project} isLoadingProject={isLoadingProject} />}
        {showSidebarBriefs && project && (
          <SidebarBriefs project={project} briefs={briefs} isLoadingBriefs={isLoadingBriefs} />
        )}
        {showSidebarShots && project && (
          <SidebarShots isLoadingShots={isLoadingShots} shots={shots} project={project} />
        )}
      </div>
    </div>
  )
}
