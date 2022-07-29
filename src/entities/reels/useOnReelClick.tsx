import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useContextMenu } from '../../hooks/useContextMenu'
import {
  setActiveReelsIds,
  setActiveReelsTypeId,
  setActiveShotId,
} from '../../store/reducers/entities.reducer'

export const useOnReelClick = () => {
  const dispatch = useAppDispatch()
  const { activeReelsIds } = useAppSelector(state => state.entities)

  const { position, isMenuShow: isItemMenuShow, showContextMenu, hideContextMenu } = useContextMenu()

  const onItemClickHandler = (e, reelId) => {
    e.type === 'mousedown' && hideContextMenu()
    switch (e.type) {
      case 'click':
        dispatch(
          setActiveReelsIds(activeReelsIds.length === 1 && activeReelsIds[0] === reelId ? [] : [reelId])
        )
        break
      case 'contextmenu':
        dispatch(setActiveReelsIds([reelId]))
        showContextMenu(e)
        break
    }
    dispatch(setActiveShotId(null))
    dispatch(setActiveReelsTypeId(null))
  }

  return { onItemClickHandler, isItemMenuShow, position }
}
