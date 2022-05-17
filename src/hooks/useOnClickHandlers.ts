import { useAppDispatch, useAppSelector } from './redux'
import { setActiveReelsIds, setActiveShotId } from '../store/reducers/entities.reducer'
import { useGetReelsByProjectId } from './api/useReelsApi'

export const useOnShotClickHandler = () => {
  const dispatch = useAppDispatch()
  const { activeShotId, activeReelsIds, activeProjectId, dragShotId } = useAppSelector(
    state => state.entities
  )
  const { data: reels } = useGetReelsByProjectId(activeProjectId)

  const onShotClickHandler = shotId => {
    const isDragShot = shotId === dragShotId
    const isSameShot = shotId === activeShotId
    const selectedShotId = !isDragShot && isSameShot ? null : shotId
    const reelsIds = reels
      ?.filter(reel => reel.shots?.find(shot => shot.id === selectedShotId))
      .map(reel => reel.id)

    dispatch(setActiveShotId(selectedShotId))
    dispatch(setActiveReelsIds(reelsIds))
  }

  return { onShotClickHandler }
}
