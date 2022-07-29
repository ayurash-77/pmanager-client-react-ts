import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useContextMenu } from '../../hooks/useContextMenu'
import { setActiveProjectId } from '../../store/reducers/entities.reducer'
import { setActiveMenu } from '../../store/reducers/ui.reducer'

export const useOnProjectClick = () => {
  const dispatch = useAppDispatch()
  const { activeProjectId } = useAppSelector(state => state.entities)
  const { position, isMenuShow: isProjectMenuShow, showContextMenu } = useContextMenu()
  const navigate = useNavigate()

  const onProjectClickHandler = (e, projectId) => {
    dispatch(setActiveProjectId(projectId))
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

  return { onProjectClickHandler, isProjectMenuShow, position }
}
