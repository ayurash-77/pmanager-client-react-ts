import { Menubar } from './menubar/Menubar'
import { MainMenu } from './menubar/MainMenu'
import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { Outlet, useParams } from 'react-router'
import { ProjectMenu } from './menubar/ProjectMenu'
import { setActiveProjectId } from '../store/reducers/entities.reducer'
import { useLocation } from 'react-router-dom'
import { setActiveMenu } from '../store/reducers/ui.reducer'

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
  const { activeProjectId } = useAppSelector(state => state.entities)
  const { activeMenu } = useAppSelector(state => state.ui.menubar)

  const { id } = useParams()
  const dispatch = useAppDispatch()

  const { darkMode } = useAppSelector(state => state.ui.theme)

  const { pathname } = useLocation()

  useEffect(() => {
    document.body.setAttribute('darkMode', darkMode.toString())
    if (!activeProjectId && +id) dispatch(setActiveProjectId(+id))
    pathname === '/projects' && dispatch(setActiveMenu('projects'))
    pathname.includes('reel') && dispatch(setActiveMenu('reels'))
  }, [activeProjectId, darkMode, dispatch, id, pathname])

  return (
    <Container>
      <Menubar>{activeMenu === '/projects' ? <MainMenu /> : <ProjectMenu />}</Menubar>

      <Outlet />
    </Container>
  )
}
