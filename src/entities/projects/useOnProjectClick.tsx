import { useNavigate } from 'react-router-dom'
import { CommonIcons } from '../../assets/icons/common-icons'
import { ToolbarIcons } from '../../assets/icons/toolbar-icons'
import { IContextMenuItem } from '../../components/ui/ContextMenu/ContextMenuItem'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useContextMenu } from '../../hooks/useContextMenu'
import { usePermissions } from '../../hooks/usePermissions'
import { setActiveProjectId } from '../../store/reducers/entities.reducer'
import { setProjectModal } from '../../store/reducers/modals.reducer'
import { setActiveMenu } from '../../store/reducers/ui.reducer'

export const useOnProjectClick = () => {
  const dispatch = useAppDispatch()
  const { activeProjectId } = useAppSelector(state => state.entities)
  const { isMenuShow: isItemMenuShow, showMenu, hideMenu, position } = useContextMenu()
  const navigate = useNavigate()

  const { canCreateProject } = usePermissions()
  const itemMenuData: IContextMenuItem[] = [
    {
      title: 'New Project',
      icon: CommonIcons.plus(),
      shortcut: 'Ctrl+N',
      action: () => canCreateProject && dispatch(setProjectModal({ isOpen: true })),
      disabled: !canCreateProject,
    },
    {
      title: 'Add existing Shot',
      icon: CommonIcons.plus(),
      shortcut: 'Ctrl+Alt+S',
      action: () => alert('Add existing Shot'),
    },
    {
      title: 'Edit Reel',
      icon: ToolbarIcons.gear(),
      shortcut: 'Ctrl+E',
      action: () => alert('Edit Reel'),
    },
    {
      title: 'Delete Reel',
      icon: CommonIcons.trash(),
      variant: 'accent',
      shortcut: 'Ctrl+Del',
      action: () => alert('setDeleteModalShow(true)'),
      disabled: !canCreateProject,
    },
  ]

  const showItemMenu = (e, projectId: number) => {
    dispatch(setActiveProjectId(projectId))
    e.detail === 0 && hideMenu()

    switch (e.detail) {
      case 0:
        dispatch(setActiveProjectId(projectId))
        showMenu(e)
        break
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

  return {
    showItemMenu,
    isItemMenuShow,
    itemMenuData,
    position,
  }
}
