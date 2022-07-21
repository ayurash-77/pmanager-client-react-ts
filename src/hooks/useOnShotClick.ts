import { skipToken } from '@reduxjs/toolkit/query'
import { useGetReelsQuery } from '../store/api/reels.api'
import { setActiveReelsIds, setActiveReelsTypeId, setActiveShotId } from '../store/reducers/entities.reducer'
import { useAppDispatch, useAppSelector } from './redux'
import { useContextMenu } from './useContextMenu'

export const useOnShotClick = () => {
  const dispatch = useAppDispatch()
  const { activeShotId, activeProjectId, dragShotId } = useAppSelector(state => state.entities)
  const { data: reels } = useGetReelsQuery(activeProjectId ?? skipToken)
  const { position, isMenuShow, showContextMenu } = useContextMenu()

  const onShotClickHandler = (e, shotId) => {
    e.preventDefault()

    const isDragShot = shotId === dragShotId
    const isSameShot = shotId === activeShotId
    const selectedShotId = !isDragShot && isSameShot ? null : shotId

    const getReelsIds = id => reels?.filter(reel => reel.shotsIds?.includes(id)).map(reel => reel.id)

    switch (e.type) {
      case 'click':
        dispatch(setActiveShotId(selectedShotId))
        dispatch(setActiveReelsIds(getReelsIds(selectedShotId)))
        dispatch(setActiveReelsTypeId(null))
        break
      case 'contextmenu':
        dispatch(setActiveShotId(shotId))
        dispatch(setActiveReelsIds(getReelsIds(shotId)))
        showContextMenu(e)
    }
  }

  return { onShotClickHandler, position, isMenuShow }
}
