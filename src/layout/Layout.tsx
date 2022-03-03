import { Menubar } from './Menubar'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from '../components/sidebar/Sidebar'
import { MainMenu } from '../components/menubar/MainMenu'
import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { Filterbar } from '../components/filterbar/Filterbar'
import { Outlet, useLocation } from 'react-router'
import { useLocationState } from '../hooks/useLocationState'
import { ProjectMenu } from '../components/menubar/ProjectMenu'
import { Route, Routes, Navigate } from 'react-router-dom'
import { HeaderProject } from './HeaderProject'

const Container = styled.div`
  transition: color 250ms;
  display: flex;
  width: 100vw;
  .mainbar {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .header {
    padding: 8px 10px;
    background-color: var(--header-bg);
    z-index: 3;
    box-shadow: 0 0 4px var(--button-shadow);
  }
  .body {
    z-index: 1;
    padding: 10px;
    height: 100%;
    overflow: auto;
  }
`

export const Layout: FC = () => {
  const [menubarExpanded, setMenubarExpanded] = useLocalStorage(true, 'menubarExpanded')
  const [sidebarShow, setSidebarShow] = useLocalStorage(true, 'sidebarShow')
  const { filterBar } = useAppSelector(state => state.ui)
  const toggleMenubarExpandHelper = () => {
    setMenubarExpanded(!menubarExpanded)
  }
  const toggleSidebarShowHelper = () => {
    setSidebarShow(!sidebarShow)
  }

  const { isProjectsState, state } = useLocationState()

  const { darkMode } = useAppSelector(state => state.ui.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.body.setAttribute('darkMode', darkMode.toString())
  }, [darkMode, dispatch])

  console.log(state)

  return (
    <Container>
      <Menubar toggle={toggleMenubarExpandHelper} menubarExpanded={menubarExpanded}>
        {isProjectsState ? (
          <MainMenu menubarExpanded={menubarExpanded} />
        ) : (
          <ProjectMenu menubarExpanded={menubarExpanded} />
        )}
      </Menubar>

      <div className={'mainbar'}>
        <div className={'header'}>
          {isProjectsState && <Header sidebarShow={sidebarShow} onClick={toggleSidebarShowHelper} />}
          {!isProjectsState && <HeaderProject sidebarShow={sidebarShow} onClick={toggleSidebarShowHelper} />}
        </div>
        {isProjectsState && <Filterbar {...filterBar} />}

        <div className="body">
          <Outlet />
        </div>
        <Footer />
      </div>

      <Sidebar sidebarShow={sidebarShow} />
    </Container>
  )
}
