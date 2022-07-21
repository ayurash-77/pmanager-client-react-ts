import { setActiveReelsIds, setActiveReelsTypeId, setActiveShotId } from '../store/reducers/entities.reducer'
import { useAppDispatch, useAppSelector } from './redux'
import { useContextMenu } from './useContextMenu'

export const useOnReelClick = () => {
  const dispatch = useAppDispatch()
  const { activeReelsIds } = useAppSelector(state => state.entities)

  const { position, isMenuShow, showContextMenu } = useContextMenu()

  const onReelClickHandler = (e, reelId) => {
    e.preventDefault()

    switch (e.type) {
      case 'click':
        dispatch(
          setActiveReelsIds(activeReelsIds.length === 1 && activeReelsIds[0] === reelId ? [] : [reelId])
        )
        break
      case 'contextmenu':
        dispatch(setActiveReelsIds([reelId]))
        showContextMenu(e)
    }

    dispatch(setActiveShotId(null))
    dispatch(setActiveReelsTypeId(null))
  }

  return { onReelClickHandler, position, isMenuShow }
}
