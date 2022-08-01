import { CommonIcons } from '../../assets/icons/common-icons'
import { IContextMenuItem } from '../../components/ui/ContextMenu/ContextMenuItem'
import { useAppDispatch } from '../../hooks/redux'
import { useContextMenu } from '../../hooks/useContextMenu'
import { usePermissions } from '../../hooks/usePermissions'
import { setReelModal } from '../../store/reducers/modals.reducer'

export const useOnRibbonReelClick = () => {
  const dispatch = useAppDispatch()

  const { isMenuShow: isCommonMenuShow, showMenu: showCommonMenu, position } = useContextMenu()

  const { canCreateProject } = usePermissions()
  const commonMenuData: IContextMenuItem[] = [
    {
      title: 'New Reel',
      icon: CommonIcons.plus(),
      entityType: 'reel',
      shortcut: 'Ctrl+N',
      action: () => dispatch(setReelModal({ isOpen: true })),
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
