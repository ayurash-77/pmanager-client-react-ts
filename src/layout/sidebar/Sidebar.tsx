import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ToolButton, ToolButtonGroup } from '../../components/ui'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import { SideBarContainer, SidebarToolBarContainer, SidebarBodyContainer } from './Sidebar.styles'
import SidebarProjectInfo from './SidebarProjectInfo'
import SidebarBriefs from './SidebarBriefs'
import { InfoProjectTitle } from '../../components/info-elements'
import cn from 'classnames'
import { IProject } from '../../interfaces/IProject'
import { useGetShotsByProjectIdQuery } from '../../store/api/shots.api'
import { ShotsBlock } from '../shots-block/ShotsBlock'
import { IShot } from '../../interfaces/IShot'
import { setActiveShotId, setDragShot } from '../../store/reducers/entities.reducer'

interface ISidebar {
  project: IProject | null
  removeShotHandler?: (e) => void
  onDragStartHandler?: (e, shot, reel?) => void
}

////////////////////////////////////////////////////////////////////////
// Sidebar
////////////////////////////////////////////////////////////////////////

export const Sidebar: FC<ISidebar> = ({ project, removeShotHandler, onDragStartHandler }) => {
  const { show: sidebarShow } = useAppSelector(state => state.ui.sidebar)

  const [showSidebarInfo, setShowSidebarInfo] = useState(true)
  const [showSidebarBriefs, setShowSidebarBriefs] = useState(true)
  const [showSidebarReels, setShowSidebarReels] = useState(true)
  const [showSidebarTeam, setShowSidebarTeam] = useState(true)
  const [showSidebarStuff, setShowSidebarStuff] = useState(true)
  const [showSidebarShots, setShowSidebarShots] = useState(true)

  const { activeProjectId } = useAppSelector(state => state.projects)
  const { data: shots } = useGetShotsByProjectIdQuery(activeProjectId)

  const dispatch = useAppDispatch()

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

        {showSidebarInfo && project && <SidebarProjectInfo project={project} />}
        {showSidebarBriefs && project && <SidebarBriefs project={project} />}
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
