import { CommonIcons } from '../../assets/icons/common-icons'
import { IContextMenuItem } from '../../components/ui/ContextMenu/ContextMenuItem'
import { useAppDispatch } from '../../hooks/redux'
import { useContextMenu } from '../../hooks/useContextMenu'
import { usePermissions } from '../../hooks/usePermissions'
import { setProjectModal } from '../../store/reducers/modals.reducer'

export const useOnProjectsSpaceClick = () => {
  const dispatch = useAppDispatch()

  const { isMenuShow: isCommonMenuShow, showMenu: showCommonMenu, position } = useContextMenu()

  const { canCreateProject } = usePermissions()
  const commonMenuData: IContextMenuItem[] = [
    {
      title: 'New Project',
      icon: CommonIcons.plus(),
      shortcut: 'Ctrl+N',
      action: () => canCreateProject && dispatch(setProjectModal({ isOpen: true, mode: 'create' })),
      disabled: !canCreateProject,
    },
  ]

  return {
    isCommonMenuShow,
    showCommonMenu,
    commonMenuData,
    position,
  }
}
