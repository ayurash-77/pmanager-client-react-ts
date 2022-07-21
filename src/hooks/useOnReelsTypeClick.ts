import { skipToken } from '@reduxjs/toolkit/query'
import { useGetReelsQuery } from '../store/api/reels.api'
import { setActiveReelsIds, setActiveReelsTypeId, setActiveShotId } from '../store/reducers/entities.reducer'
import { useAppDispatch, useAppSelector } from './redux'
import { useContextMenu } from './useContextMenu'

export const useOnReelsTypeClick = () => {
  const dispatch = useAppDispatch()
  const { activeReelsTypeId, activeProjectId } = useAppSelector(state => state.entities)
  const { data: reels } = useGetReelsQuery(activeProjectId ?? skipToken)

  const { position, isMenuShow, showContextMenu } = useContextMenu()

  const onReelsTypeClickHandler = (e, reelsTypeId) => {
    e.preventDefault()
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
    }
  }

  return { onReelsTypeClickHandler, position, isMenuShow }
}
