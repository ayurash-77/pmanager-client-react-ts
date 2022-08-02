import { CommonIcons } from '../../assets/icons/common-icons'
import { IContextMenuItem } from '../../components/ui/ContextMenu/ContextMenuItem'
import { useAppDispatch } from '../../hooks/redux'
import { useContextMenu } from '../../hooks/useContextMenu'
import { usePermissions } from '../../hooks/usePermissions'
import { setReelsTypeModal } from '../../store/reducers/modals.reducer'

export const useOnRibbonReelsTypeClick = () => {
  const dispatch = useAppDispatch()

  const { isMenuShow: isCommonMenuShow, showMenu: showCommonMenu, position } = useContextMenu()

  const { canCreateProject } = usePermissions()
  const commonMenuData: IContextMenuItem[] = [
    {
      title: 'New Reels Type',
      icon: CommonIcons.plus(),
      entityType: 'reelsType',
      shortcut: 'Ctrl+N',
      action: () => dispatch(setReelsTypeModal({ isOpen: true, mode: 'create' })),
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
