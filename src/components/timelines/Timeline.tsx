import { skipToken } from '@reduxjs/toolkit/query'
import cn from 'classnames'
import { Reorder } from 'framer-motion'
import { FC, ReactNode, useEffect, useState } from 'react'
import * as CommonIcons from '../../assets/icons/common-icons'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useOnShotClickHandler } from '../../hooks/useOnClickHandlers'
import { IReel } from '../../interfaces/IReel'
import { AddShotToReelModal } from '../../modal/AddShotToReelModal'
import { useGetReelQuery, useGetReelsQuery, useUpdateReelMutation } from '../../store/api/reels.api'
import {
  setActiveReelsIds,
  setActiveReelsTypeId,
  setActiveShotId,
  setDragShotId,
} from '../../store/reducers/entities.reducer'
import { EntityCardShot } from '../entity-card/EntityCardShot'
import { IconButton } from '../ui'
import { TimelineContainer } from './Timeline.styles'

interface ITimelineWrapper {
  reelInit: IReel
  children?: ReactNode
}

// Timeline
////////////////////////////////////////////////////////////////////////////////////////////

export const Timeline: FC<ITimelineWrapper> = ({ reelInit }) => {
  const dispatch = useAppDispatch()
  const { onShotClickHandler } = useOnShotClickHandler()

  const { activeReelsIds, activeShotId, activeProjectId } = useAppSelector(state => state.entities)

  const { refetch: refetchReels } = useGetReelsQuery(activeProjectId ?? skipToken)
  const { data: reel = { ...reelInit } } = useGetReelQuery(reelInit.id ?? skipToken)
  const [updateReel] = useUpdateReelMutation()

  const shotInReel = reel?.shotsIds.includes(activeShotId)

  const onTitleClickHandler = id => {
    dispatch(setActiveReelsIds(activeReelsIds.length === 1 && activeReelsIds[0] === id ? [] : [id]))
    dispatch(setActiveShotId(null))
    dispatch(setActiveReelsTypeId(null))
  }

  const [shotsIds, setShotsIds] = useState(reel?.shotsIds)
  const [isAddShotModalShow, setAddShotModalShow] = useState(false)

  const onReorderHandler = ids => {
    dispatch(setActiveReelsIds([reel.id]))
    setShotsIds(ids)
  }

  const onDragEndHandler = async () => {
    await updateReel({ ...reel, shotsIds: shotsIds })
    dispatch(setDragShotId(null))
  }
  const onDragStartHandler = shotId => {
    dispatch(setDragShotId(shotId))
    dispatch(setActiveShotId(shotId))
  }

  const removeShotFromReelHandler = async () => {
    if (!activeShotId) return
    const newShots = reel.shots.filter(shot => shot.id !== activeShotId)
    const newShotsIds = reel.shotsIds.filter(id => id !== activeShotId)
    await updateReel({ ...reel, shots: newShots, shotsIds: newShotsIds })
    dispatch(setActiveShotId(null))
    dispatch(setActiveReelsIds([reel.id]))
    setShotsIds(newShotsIds)
  }

  const addShotToReelHandler = () => {
    dispatch(setActiveReelsIds([reel.id]))
    setAddShotModalShow(true)
  }

  useEffect(() => {
    setShotsIds(reel.shotsIds)
    refetchReels()
  }, [reel, refetchReels])

  // RENDER
  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <AddShotToReelModal
        isOpen={isAddShotModalShow}
        reel={reel}
        closeAction={() => setAddShotModalShow(false)}
      />
      <TimelineContainer>
        <div
          className={cn('code', { active: activeReelsIds.includes(reel.id) })}
          onClick={() => onTitleClickHandler(reel.id)}
        >
          {reel.highPriority && <span className="highPriority" />}
          {reel.code}
          {reel.name?.length > 0 && <div className={'name'}> - {reel.name}</div>}
          <div className={'shotsCount'}>
            - {reel.shots.length} shot{reel.shots.length !== 1 && 's'}
          </div>
        </div>

        <div className={'timelineRow'}>
          <div className={'timelineItemsRow'}>
            <div className={cn('timelineItems', { active: activeReelsIds.includes(reel.id) })}>
              <Reorder.Group
                as={'div'}
                axis={'x'}
                values={shotsIds}
                onReorder={onReorderHandler}
                style={{ display: 'flex', gap: 4 }}
              >
                {shotsIds.map(shotId => (
                  <Reorder.Item
                    key={shotId}
                    value={shotId}
                    whileDrag={{ scale: 0.9, cursor: 'grabbing', boxShadow: '0 4px 8px #00000060' }}
                    onDragEnd={onDragEndHandler}
                    onDragStart={() => onDragStartHandler(shotId)}
                    onClick={() => onShotClickHandler(shotId)}
                  >
                    <EntityCardShot
                      entity={reel.shots.find(shot => shot.id === shotId)}
                      isSelected={activeShotId === shotId}
                      draggable={true}
                    />
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          </div>
          <div className={'timelineItemsButtons'}>
            <IconButton size={13} icon={<CommonIcons.Plus />} onClick={addShotToReelHandler} />
            <IconButton
              size={13}
              icon={<CommonIcons.Minus />}
              disabled={!shotInReel}
              variant={'accent'}
              onClick={removeShotFromReelHandler}
            />
          </div>
        </div>
      </TimelineContainer>
    </>
  )
}
