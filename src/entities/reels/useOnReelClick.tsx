import { useDispatch } from 'react-redux'
import { CommonIcons } from '../../assets/icons/common-icons'
import { ToolbarIcons } from '../../assets/icons/toolbar-icons'
import { IContextMenuItem } from '../../components/ui/ContextMenu/ContextMenuItem'
import { useAppSelector } from '../../hooks/redux'
import { useContextMenu } from '../../hooks/useContextMenu'
import { usePermissions } from '../../hooks/usePermissions'
import {
  setActiveReelsIds,
  setActiveReelsTypeId,
  setActiveShotId,
} from '../../store/reducers/entities.reducer'
import { setReelModal } from '../../store/reducers/modals.reducer'

export const useOnReelClick = () => {
  const dispatch = useDispatch()
  const { activeReelsIds } = useAppSelector(state => state.entities)

  const { isMenuShow: isItemMenuShow, showMenu, hideMenu, position } = useContextMenu()

  const { canCreateProject } = usePermissions()
  const itemMenuData: IContextMenuItem[] = [
    {
      title: 'New Reels',
      icon: CommonIcons.plus(),
      entityType: 'reel',
      shortcut: 'Ctrl+N',
      action: () => dispatch(setReelModal({ isOpen: true, mode: 'create' })),
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
      action: () => dispatch(setReelModal({ isOpen: true, mode: 'edit' })),
    },
    {
      title: 'Delete Reel',
      icon: CommonIcons.trash(),
      variant: 'accent',
      shortcut: 'Ctrl+Del',
      action: () => dispatch(setReelModal({ isOpen: true, mode: 'delete' })),
      disabled: !canCreateProject,
    },
  ]

  const showItemMenu = (e, reelId: number) => {
    e.detail === 0 && hideMenu()

    dispatch(setActiveShotId(null))
    dispatch(setActiveReelsTypeId(null))

    switch (e.detail) {
      case 0:
        dispatch(setActiveReelsIds([reelId]))
        showMenu(e)
        break
      case 1:
        dispatch(
          setActiveReelsIds(activeReelsIds.length === 1 && activeReelsIds[0] === reelId ? [] : [reelId])
        )
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
