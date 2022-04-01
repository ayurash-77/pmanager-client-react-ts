import { FC, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { ToolButton, ToolButtonGroup } from '../../components/ui'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import * as s from './Sidebar.styles'
import SidebarProjectInfo from './SidebarProjectInfo'
import SidebarBriefs from './SidebarBriefs'
import { InfoProjectTitle } from '../../components/info-elements'
import cn from 'classnames'
import { IProject } from '../../interfaces/IProject'

interface ISidebar {
  project: IProject | null
  sidebarShow: boolean
}

export const Sidebar: FC<ISidebar> = ({ project, sidebarShow }) => {
  const [showSidebarInfo, setShowSidebarInfo] = useState(true)
  const [showSidebarBriefs, setShowSidebarBriefs] = useState(true)
  const [showSidebarReels, setShowSidebarReels] = useState(true)
  const [showSidebarTeam, setShowSidebarTeam] = useState(true)
  const [showSidebarStuff, setShowSidebarStuff] = useState(true)
  const [showSidebarShots, setShowSidebarShots] = useState(true)

  return (
    <s.SideBarContainer className={cn({ hide: !sidebarShow })} sidebarShow={sidebarShow}>
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
      </s.SidebarBodyContainer>
    </s.SideBarContainer>
  )
}
