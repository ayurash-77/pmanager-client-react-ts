import { skipToken } from '@reduxjs/toolkit/query'
import { CommonIcons } from '../../assets/icons/common-icons'
import { ToolbarIcons } from '../../assets/icons/toolbar-icons'
import { IContextMenuItem } from '../../components/ui/ContextMenu/ContextMenuItem'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useContextMenu } from '../../hooks/useContextMenu'
import { usePermissions } from '../../hooks/usePermissions'
import {
  setActiveReelsIds,
  setActiveReelsTypeId,
  setActiveShotId,
} from '../../store/reducers/entities.reducer'
import { setReelsTypeModal } from '../../store/reducers/modals.reducer'
import { useGetReelsQuery } from '../reels/reels.api'

export const useOnReelsTypeClick = () => {
  const dispatch = useAppDispatch()
  const { activeReelsTypeId, activeProjectId } = useAppSelector(state => state.entities)
  const { data: reels } = useGetReelsQuery(activeProjectId ?? skipToken)

  const { isMenuShow: isItemMenuShow, showMenu, hideMenu, position } = useContextMenu()

  const { canCreateProject } = usePermissions()
  const itemMenuData: IContextMenuItem[] = [
    {
      title: 'New Reels Type',
      icon: CommonIcons.plus(),
      entityType: 'reelsType',
      shortcut: 'Ctrl+N',
      action: () => dispatch(setReelsTypeModal({ isOpen: true, mode: 'create' })),
    },
    {
      title: 'Add existing Reel',
      icon: CommonIcons.plus(),
      shortcut: 'Ctrl+Alt+R',
      action: () => alert('Add Reel'),
    },
    {
      title: 'Edit Reels Type',
      icon: ToolbarIcons.gear(),
      shortcut: 'Ctrl+E',
      action: () => alert('Edit Reels Type'),
    },
    {
      title: 'Delete Reels Type',
      icon: CommonIcons.trash(),
      variant: 'accent',
      shortcut: 'Ctrl+Del',
      action: () => dispatch(setReelsTypeModal({ isOpen: true, mode: 'delete' })),
      disabled: !canCreateProject,
    },
  ]

  const showItemMenu = (e, reelsTypeId) => {
    e.type === 'mousedown' && hideMenu()

    const isSameItem = reelsTypeId === activeReelsTypeId
    const reelsIds = reels?.filter(reel => reel.reelsTypeId === reelsTypeId).map(reel => reel.id)

    dispatch(setActiveShotId(null))

    switch (e.type) {
      case 'click':
        dispatch(setActiveReelsIds(isSameItem ? [] : reelsIds))
        dispatch(setActiveReelsTypeId(isSameItem ? null : reelsTypeId))
        break
      case 'contextmenu':
        dispatch(setActiveReelsIds(reelsIds))
        dispatch(setActiveReelsTypeId(reelsTypeId))
        showMenu(e)
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
