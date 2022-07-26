import { useNavigate } from 'react-router-dom'
import { setActiveProjectId } from '../store/reducers/entities.reducer'
import { setActiveMenu } from '../store/reducers/ui.reducer'
import { useAppDispatch, useAppSelector } from './redux'
import { useContextMenu } from './useContextMenu'

export const useOnProjectClick = () => {
  const dispatch = useAppDispatch()
  const { activeProjectId } = useAppSelector(state => state.entities)
  const { position, isMenuShow, showContextMenu, hideContextMenu } = useContextMenu()
  const navigate = useNavigate()

  const onProjectClickHandler = (e, projectId) => {
    // e.preventDefault()
    dispatch(setActiveProjectId(projectId))
    // e.type === 'mousedown' && hideContextMenu()
    e.type === 'contextmenu' && showContextMenu(e)

    switch (e.detail) {
      case 1:
        dispatch(setActiveProjectId(activeProjectId === projectId ? null : projectId))
        break

      case 2:
        dispatch(setActiveProjectId(projectId))
        dispatch(setActiveMenu('reels'))
        navigate(`/projects/${projectId}/reels`, { state: 1 })
        break
    }
  }

  return { onProjectClickHandler, position, isMenuShow }
}
