import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IReel } from '../../interfaces/IReel'
import {
  setActiveReelsIds,
  setActiveReelsTypeId,
  setActiveShotId,
  setDragShotId,
} from '../../store/reducers/entities.reducer'
import { TimelineContainer } from './Timeline.styles'
import cn from 'classnames'
import { Reorder } from 'framer-motion'
import { EntityCardShot } from '../entity-card/EntityCardShot'
import { useUpdateReel } from '../../hooks/api/useReelsApi'
import { useOnShotClickHandler } from '../../hooks/useOnClickHandlers'
import * as CommonIcons from '../../assets/icons/common-icons'
import { IconButton } from '../ui'

interface ITimelineWrapper {
  reel: IReel
}

export const Timeline: FC<ITimelineWrapper> = ({ reel }) => {
  const dispatch = useAppDispatch()
  const { onShotClickHandler } = useOnShotClickHandler()

  const { activeReelsIds, activeShotId } = useAppSelector(state => state.entities)

  const { mutateAsync: updateReel, isSuccess: isSuccessUpdateReel } = useUpdateReel()

  const shotInReel = reel.shotsIds.includes(activeShotId)

  const onTitleClickHandler = id => {
    dispatch(setActiveReelsIds(activeReelsIds.length === 1 && activeReelsIds[0] === id ? [] : [id]))
    dispatch(setActiveShotId(null))
    dispatch(setActiveReelsTypeId(null))
  }

  const [shotsIds, setShotsIds] = useState(reel.shotsIds)

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
  }

  const removeShotFromReelHandler = async () => {
    if (!activeShotId) return
    console.log(`Remove shot (id: ${activeShotId}) from Reel (id: ${reel.id})`)
  }
  const addShotToReelHandler = async () => {
    console.log(`Add shot to Reel (id: ${reel.id})`)
  }

  /////////////////////////////////////////////////////////////////////

  return (
    <>
      <TimelineContainer>
        <div
          className={cn('code', { active: activeReelsIds.includes(reel.id) })}
          onClick={() => onTitleClickHandler(reel.id)}
        >
          {reel.code}
          {reel.name?.length > 0 && <div className={'name'}> - {reel.name}</div>}
          <div className={'shotsCount'}>
            - {reel.shots.length} shot{reel.shots.length !== 1 && 's'}
          </div>
          {/* <EntityIcon variant={'shot'} /> */}
          {/* {reel.shots?.length} */}
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
                    whileDrag={{ scale: 0.9, boxShadow: '0 4px 8px #00000060' }}
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
