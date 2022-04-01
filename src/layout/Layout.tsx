import { Menubar } from './menubar/Menubar'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Statusbar } from './statusbar/Statusbar'
import { HeaderProjects } from './HeaderProjects'
import { Sidebar } from './sidebar/Sidebar'
import { MainMenu } from './menubar/MainMenu'
import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { Filterbar } from './filterbar/Filterbar'
import { Outlet, useParams } from 'react-router'
import { useLocationState } from '../hooks/useLocationState'
import { ProjectMenu } from './menubar/ProjectMenu'
import { HeaderProject } from './HeaderProject'
import { setActiveProjectId } from '../store/reducers/projects.reducer'
import { useGetProjectByIdQuery } from '../store/api/projects.api'

const Container = styled.div`
  transition: color 250ms;
  display: flex;
  height: 100vh;

  .mainbar {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }
`

export const Layout: FC = () => {
  const [menubarExpanded, setMenubarExpanded] = useLocalStorage(true, 'menubarExpanded')
  const [sidebarShow, setSidebarShow] = useLocalStorage(true, 'sidebarShow')
  const { filterBar } = useAppSelector(state => state.ui)
  const { activeProjectId } = useAppSelector(state => state.projects)

  const { data: activeProject } = useGetProjectByIdQuery(activeProjectId)

  const { id } = useParams()
  const dispatch = useAppDispatch()

  const toggleMenubarExpandHelper = () => {
    setMenubarExpanded(!menubarExpanded)
  }
  const toggleSidebarShowHelper = () => {
    setSidebarShow(!sidebarShow)
  }

  const { isProjectsState, isProjectState } = useLocationState()

  const { darkMode } = useAppSelector(state => state.ui.theme)

  useEffect(() => {
    document.body.setAttribute('darkMode', darkMode.toString())
    if (!activeProjectId && +id) dispatch(setActiveProjectId(+id))
  }, [activeProjectId, darkMode, dispatch, id])

  return (
    <Container>
      <Menubar toggle={toggleMenubarExpandHelper} menubarExpanded={menubarExpanded}>
        {isProjectsState && <MainMenu menubarExpanded={menubarExpanded} />}
        {isProjectState && <ProjectMenu menubarExpanded={menubarExpanded} />}
      </Menubar>

      <div className={'mainbar'}>
        {isProjectsState && (
          <HeaderProjects
            sidebarShow={sidebarShow}
            onClick={toggleSidebarShowHelper}
            activeProject={activeProject}
          />
        )}
        {isProjectsState && <Filterbar {...filterBar} />}
        {isProjectState && (
          <HeaderProject
            sidebarShow={sidebarShow}
            onClick={toggleSidebarShowHelper}
            project={activeProject}
          />
        )}

        <Outlet />

        <Statusbar project={activeProject} />
      </div>

      <Sidebar sidebarShow={sidebarShow} project={activeProject} />
    </Container>
  )
}
