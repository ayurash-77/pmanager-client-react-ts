import { FC, useEffect } from 'react'
import { Outlet, useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setActiveProjectId } from '../../store/reducers/entities.reducer'
import { setActiveMenu } from '../../store/reducers/ui.reducer'
import { Menubar } from './menubar/Menubar'
import { MainMenu } from './menubar/mainMenu/MainMenu'
import { ProjectMenu } from './menubar/projectMenu/ProjectMenu'

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
    <div className={'flex h-full'}>
      <Menubar>{activeMenu === 'projects' ? <MainMenu /> : <ProjectMenu />}</Menubar>
      <Outlet />
    </div>
  )
}
