import { skipToken } from '@reduxjs/toolkit/query'
import { useGetReelsQuery } from '../store/api/reels.api'
import { setActiveReelsIds, setActiveReelsTypeId, setActiveShotId } from '../store/reducers/entities.reducer'
import { useAppDispatch, useAppSelector } from './redux'

export const useOnShotClickHandler = () => {
  const dispatch = useAppDispatch()
  const { activeShotId, activeReelsTypeId, activeProjectId, dragShotId } = useAppSelector(
    state => state.entities
  )
  const { data: reels } = useGetReelsQuery(activeProjectId ?? skipToken)

  const onShotClickHandler = shotId => {
    const isDragShot = shotId === dragShotId
    const isSameShot = shotId === activeShotId
    const selectedShotId = !isDragShot && isSameShot ? null : shotId
    const reelsIds = reels?.filter(reel => reel.shotsIds?.includes(selectedShotId)).map(reel => reel.id)

    dispatch(setActiveShotId(selectedShotId))
    dispatch(setActiveReelsIds(reelsIds))
    dispatch(setActiveReelsTypeId(null))
  }

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
    }
  }

  return { onShotClickHandler, onReelsTypeClickHandler }
}
