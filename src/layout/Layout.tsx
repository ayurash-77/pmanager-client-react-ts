import { Menubar } from './Menubar'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Footer } from './Footer'
import { HeaderProjects } from './HeaderProjects'
import { Sidebar } from '../components/sidebar/Sidebar'
import { MainMenu } from '../components/menubar/MainMenu'
import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { Filterbar } from '../components/filterbar/Filterbar'
import { Outlet, useParams } from 'react-router'
import { useLocationState } from '../hooks/useLocationState'
import { ProjectMenu } from '../components/menubar/ProjectMenu'
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

  .header {
    padding: 8px 10px;
    z-index: 3;
    background-color: var(--header-bg);
    box-shadow: 0 0 4px var(--button-shadow);
  }

  .footer {
    min-height: 60px;
    background: #0c0d16;
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

  const { isProjectsState, isProjectState, state } = useLocationState()

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
        <div className={'header'}>
          {isProjectsState && <HeaderProjects sidebarShow={sidebarShow} onClick={toggleSidebarShowHelper} />}
          {isProjectState && <HeaderProject sidebarShow={sidebarShow} onClick={toggleSidebarShowHelper} />}
        </div>
        {isProjectsState && <Filterbar {...filterBar} />}

        <Outlet />
        <Footer />
      </div>

      <Sidebar sidebarShow={sidebarShow} />
    </Container>
  )
}
