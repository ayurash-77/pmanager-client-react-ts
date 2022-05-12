import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ToolButton, ToolButtonGroup } from '../../components/ui'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import { SideBarContainer, SidebarToolBarContainer, SidebarBodyContainer } from './Sidebar.styles'
import SidebarProjectInfo from './SidebarProjectInfo'
import SidebarBriefs from './SidebarBriefs'
import { InfoProjectTitle } from '../../components/info-elements'
import cn from 'classnames'
import { ShotsBlock } from '../shots-block/ShotsBlock'
import { useGetShotsByProjectId } from '../../hooks/api/useShotsApi'
import { useGetProject } from '../../hooks/api/useProjectsApi'

interface ISidebar {
  removeShotHandler?: (e) => void
  onDragStartHandler?: (e, shot, reel?) => void
}

////////////////////////////////////////////////////////////////////////
// Sidebar
////////////////////////////////////////////////////////////////////////

export const Sidebar: FC<ISidebar> = ({ removeShotHandler, onDragStartHandler }) => {
  const dispatch = useAppDispatch()
  const { show: sidebarShow } = useAppSelector(state => state.ui.sidebar)

  const [showSidebarInfo, setShowSidebarInfo] = useState(true)
  const [showSidebarBriefs, setShowSidebarBriefs] = useState(true)
  const [showSidebarReels, setShowSidebarReels] = useState(true)
  const [showSidebarTeam, setShowSidebarTeam] = useState(true)
  const [showSidebarStuff, setShowSidebarStuff] = useState(true)
  const [showSidebarShots, setShowSidebarShots] = useState(true)

  const { activeProjectId } = useAppSelector(state => state.entities)
  const { data: project, isLoading: isLoadingProject } = useGetProject(activeProjectId)
  const { data: shots, isLoading: isLoadingShots } = useGetShotsByProjectId(activeProjectId)

  ////////////////////////////////////////////////////////////////////////

  return (
    <SideBarContainer className={cn({ hide: !sidebarShow })} sidebarShow={sidebarShow}>
      <SidebarToolBarContainer>
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
      </SidebarToolBarContainer>
      <SidebarBodyContainer>
        {project && (
          <InfoProjectTitle
            margin={8}
            title={project.title}
            highPriority={project.highPriority}
            align={'center'}
            status={project.status}
          />
        )}

        {showSidebarInfo && project && (
          <SidebarProjectInfo project={project} isFetchingProject={isLoadingProject} />
        )}
        {showSidebarBriefs && project && (
          <SidebarBriefs project={project} isFetchingProject={isLoadingProject} />
        )}
        {showSidebarShots && project && shots && (
          <ShotsBlock
            shots={shots}
            project={project}
            onDragStartHandler={onDragStartHandler}
            removeShotHandler={removeShotHandler}
          />
        )}
      </SidebarBodyContainer>
    </SideBarContainer>
  )
}
