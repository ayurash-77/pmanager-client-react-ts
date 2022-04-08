import { Menubar } from './menubar/Menubar'
import { MainMenu } from './menubar/MainMenu'
import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { Outlet, useParams } from 'react-router'
import { useLocationState } from '../hooks/useLocationState'
import { ProjectMenu } from './menubar/ProjectMenu'
import { setActiveProjectId } from '../store/reducers/projects.reducer'

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
  const { activeProjectId } = useAppSelector(state => state.projects)

  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { isProjectsState, isProjectState } = useLocationState()

  const { darkMode } = useAppSelector(state => state.ui.theme)

  useEffect(() => {
    document.body.setAttribute('darkMode', darkMode.toString())
    if (!activeProjectId && +id) dispatch(setActiveProjectId(+id))
  }, [activeProjectId, darkMode, dispatch, id])

  return (
    <Container>
      <Menubar>
        {isProjectsState && <MainMenu />}
        {isProjectState && <ProjectMenu />}
      </Menubar>

      <Outlet />
    </Container>
  )
}
