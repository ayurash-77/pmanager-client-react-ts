import { FC, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { useGetAllProjectsQuery } from '../../store/api/projects.api'
import { ToolButton, ToolButtonGroup } from '../ui'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import * as s from './Sidebar.styles'
import SidebarProjectInfo from './SidebarProjectInfo'
import SidebarBriefs from './SidebarBriefs'
import { InfoProjectTitle } from '../info-elements'
import cn from 'classnames'

interface ISidebar {
  sidebarShow: boolean
}

export const Sidebar: FC<ISidebar> = props => {
  const { selectedId } = useAppSelector(state => state.projects)
  const { data: projects } = useGetAllProjectsQuery({})

  const selectedProject = selectedId && projects ? projects.find(project => project.id === selectedId) : null

  const [showSidebarInfo, setShowSidebarInfo] = useState(true)
  const [showSidebarBriefs, setShowSidebarBriefs] = useState(true)
  const [showSidebarReels, setShowSidebarReels] = useState(true)
  const [showSidebarTeam, setShowSidebarTeam] = useState(true)
  const [showSidebarStuff, setShowSidebarStuff] = useState(true)
  const [showSidebarShots, setShowSidebarShots] = useState(true)

  return (
    <s.SideBarContainer className={cn({ hide: !props.sidebarShow })} {...props}>
      <s.SidebarToolBarContainer>
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
      </s.SidebarToolBarContainer>
      <s.SidebarBodyContainer>
        {selectedProject && (
          <InfoProjectTitle
            margin={8}
            title={selectedProject.title}
            highPriority={selectedProject.highPriority}
            align={'center'}
            status={selectedProject.status}
          />
        )}

        {showSidebarInfo && selectedProject && <SidebarProjectInfo project={selectedProject} />}
        {showSidebarBriefs && selectedProject && <SidebarBriefs project={selectedProject} />}
      </s.SidebarBodyContainer>
    </s.SideBarContainer>
  )
}
