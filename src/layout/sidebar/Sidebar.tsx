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
import { IProject } from '../../interfaces/IProject'
import Loader from '../../components/ui/Loader'
import { useGetBriefsByProjectId } from '../../hooks/api/useBriefsApi'

interface ISidebar {
  project: IProject
  isLoadingProject?: boolean
  onDragStartHandler?: (e, shot, reel?) => void
}

////////////////////////////////////////////////////////////////////////
// Sidebar
////////////////////////////////////////////////////////////////////////

export const Sidebar: FC<ISidebar> = ({ project, isLoadingProject, onDragStartHandler }) => {
  const dispatch = useAppDispatch()
  const { show: sidebarShow } = useAppSelector(state => state.ui.sidebar)

  const [showSidebarInfo, setShowSidebarInfo] = useState(true)
  const [showSidebarBriefs, setShowSidebarBriefs] = useState(true)
  const [showSidebarReels, setShowSidebarReels] = useState(true)
  const [showSidebarTeam, setShowSidebarTeam] = useState(true)
  const [showSidebarStuff, setShowSidebarStuff] = useState(true)
  const [showSidebarShots, setShowSidebarShots] = useState(true)

  const { activeProjectId } = useAppSelector(state => state.entities)
  const { data: shots, isLoading: isLoadingShots } = useGetShotsByProjectId(activeProjectId)
  const { data: briefs, isLoading: isLoadingBriefs } = useGetBriefsByProjectId(activeProjectId)

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
          <SidebarProjectInfo project={project} isLoadingProject={isLoadingProject} />
        )}
        {showSidebarBriefs && project && (
          <SidebarBriefs project={project} briefs={briefs} isLoadingBriefs={isLoadingBriefs} />
        )}
        {showSidebarShots && project && (
          <ShotsBlock
            isLoadingShots={isLoadingShots}
            shots={shots}
            project={project}
            onDragStartHandler={onDragStartHandler}
          />
        )}
      </SidebarBodyContainer>
    </SideBarContainer>
  )
}
