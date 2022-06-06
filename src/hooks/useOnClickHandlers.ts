import { useAppDispatch, useAppSelector } from './redux'
import { setActiveReelsIds, setActiveShotId } from '../store/reducers/entities.reducer'
import { useGetReelsByProjectId } from './api/useReelsApi'
import { useEffect, useState } from 'react'

export const useOnShotClickHandler = () => {
  const dispatch = useAppDispatch()
  const { activeShotId, activeProjectId, dragShotId } = useAppSelector(state => state.entities)
  const { data: reels } = useGetReelsByProjectId(activeProjectId)
  // const [reels, setReels] = useState(reelsInit)

  const onShotClickHandler = shotId => {
    const isDragShot = shotId === dragShotId
    const isSameShot = shotId === activeShotId
    const selectedShotId = !isDragShot && isSameShot ? null : shotId
    const reelsIds = reels?.filter(reel => reel.shotsIds?.includes(selectedShotId)).map(reel => reel.id)

    dispatch(setActiveShotId(selectedShotId))
    dispatch(setActiveReelsIds(reelsIds))
    console.log(shotId)
  }

  // useEffect(() => {
  //   setReels(reelsInit)
  //   return onShotClickHandler(shotId)
  // }, [reelsInit])

  return { onShotClickHandler }
}
