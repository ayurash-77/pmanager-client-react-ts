import { FC, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useGetProjectQuery,
} from '../../store/api/projects.api'
import { ToolButton } from '../ui/ToolButton'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import * as s from './Sidebar.styles'
import SidebarInfo from './SidebarInfo'
import SidebarBriefs from './SidebarBriefs'
import { InfoProjectTitle } from '../info-elements/InfoElements'

interface ISidebar {
  sidebarShow: boolean
}

export const Sidebar: FC<ISidebar> = props => {
  const { selectedId } = useAppSelector(state => state.projects)
  const { data: projects } = useGetAllProjectsQuery({})

  const selectedProject = selectedId ? projects.find(project => project.id === selectedId) : null

  const [showSidebarInfo, setShowSidebarInfo] = useState(true)
  const [showSidebarBriefs, setShowSidebarBriefs] = useState(true)
  const [showSidebarReels, setShowSidebarReels] = useState(true)
  const [showSidebarTeam, setShowSidebarTeam] = useState(true)
  const [showSidebarStuff, setShowSidebarStuff] = useState(true)
  const [showSidebarShots, setShowSidebarShots] = useState(true)

  return (
    <s.SideBarContainer {...props}>
      <s.SidebarToolBarContainer>
        <ToolButton
          icon={<ToolbarIcons.Info />}
          rounded="left"
          selected={showSidebarInfo}
          onClick={() => setShowSidebarInfo(prev => !prev)}
        />
        <ToolButton
          icon={<ToolbarIcons.Brief />}
          rounded="none"
          selected={showSidebarBriefs}
          onClick={() => setShowSidebarBriefs(prev => !prev)}
        />
        <ToolButton
          icon={<ToolbarIcons.Reel />}
          rounded="none"
          selected={showSidebarReels}
          onClick={() => setShowSidebarReels(prev => !prev)}
        />
        <ToolButton
          icon={<ToolbarIcons.User />}
          rounded="none"
          selected={showSidebarTeam}
          onClick={() => setShowSidebarTeam(prev => !prev)}
        />
        <ToolButton
          icon={<ToolbarIcons.Stuff />}
          rounded="none"
          selected={showSidebarStuff}
          onClick={() => setShowSidebarStuff(prev => !prev)}
        />
        <ToolButton
          icon={<ToolbarIcons.Shot />}
          rounded="right"
          marginRight
          selected={showSidebarShots}
          onClick={() => setShowSidebarShots(prev => !prev)}
        />
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

        {showSidebarInfo && selectedProject && <SidebarInfo project={selectedProject} />}
        {showSidebarBriefs && selectedProject && <SidebarBriefs project={selectedProject} />}
      </s.SidebarBodyContainer>
    </s.SideBarContainer>
  )
}

export default Sidebar
