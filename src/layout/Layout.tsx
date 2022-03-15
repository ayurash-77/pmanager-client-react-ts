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
import { setSelectedId } from '../store/reducers/projects.reducer'

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
  const { selectedId } = useAppSelector(state => state.projects)

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
    if (!selectedId && +id) dispatch(setSelectedId(+id))
  }, [darkMode, dispatch, id, selectedId])

  return (
    <Container>
      <Menubar toggle={toggleMenubarExpandHelper} menubarExpanded={menubarExpanded}>
        {isProjectsState && <MainMenu menubarExpanded={menubarExpanded} />}
        {isProjectState && <ProjectMenu menubarExpanded={menubarExpanded} />}
      </Menubar>

      <div className={'mainbar'}>
        {isProjectsState && <HeaderProjects sidebarShow={sidebarShow} onClick={toggleSidebarShowHelper} />}
        {isProjectState && <HeaderProject sidebarShow={sidebarShow} onClick={toggleSidebarShowHelper} />}
        {isProjectsState && <Filterbar {...filterBar} />}

        <Outlet />

        <Statusbar />
      </div>

      <Sidebar sidebarShow={sidebarShow} />
    </Container>
  )
}
