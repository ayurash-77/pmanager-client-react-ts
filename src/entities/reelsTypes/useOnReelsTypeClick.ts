import { skipToken } from '@reduxjs/toolkit/query'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useContextMenu } from '../../hooks/useContextMenu'
import {
  setActiveReelsIds,
  setActiveReelsTypeId,
  setActiveShotId,
} from '../../store/reducers/entities.reducer'
import { useGetReelsQuery } from '../reels/reels.api'

export const useOnReelsTypeClick = () => {
  const dispatch = useAppDispatch()
  const { activeReelsTypeId, activeProjectId } = useAppSelector(state => state.entities)
  const { data: reels } = useGetReelsQuery(activeProjectId ?? skipToken)

  const { position, isMenuShow: isItemMenuShow, showContextMenu, hideContextMenu } = useContextMenu()

  const onItemClickHandler = (e, reelsTypeId) => {
    e.type === 'mousedown' && hideContextMenu()

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
        showContextMenu(e)
        break
    }
  }

  return { onItemClickHandler, position, isItemMenuShow }
}
