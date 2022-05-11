import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IReel } from '../../interfaces/IReel'
import {
  setActiveReelsIds,
  setActiveReelsTypeId,
  setActiveShotId,
  setDragShot,
  setDropReel,
} from '../../store/reducers/entities.reducer'
import { TimelineContainer } from './Timeline.styles'
import cn from 'classnames'
import { IShot } from '../../interfaces/IShot'
import { Reorder } from 'framer-motion'
import { EntityCardShot } from '../entity-card/EntityCardShot'
import { useUpdateReelMutation } from '../../store/api/reels.api'

interface ITimelineWrapper {
  title: string
  reel: IReel
  refetchReels?: () => void
  // updateReel?: (e) => void
}

export const Timeline: FC<ITimelineWrapper> = ({ title, reel, refetchReels }) => {
  const dispatch = useAppDispatch()

  const { activeReelsIds, activeShotId } = useAppSelector(state => state.entities)

  const [updateReel, { isSuccess: isSuccessUpdateReel, status }] = useUpdateReelMutation()

  const onTitleClickHandler = id => {
    dispatch(setActiveReelsIds(activeReelsIds.length === 1 && activeReelsIds[0] === id ? [] : [id]))
    dispatch(setActiveShotId(null))
    dispatch(setActiveReelsTypeId(null))
  }

  const [shotsOrdered, setShotsOrdered] = useState(reel.shots)

  const onDragStartHandler = (e, shot: IShot, reel?: IReel) => {
    dispatch(setDragShot(shot))
    dispatch(setActiveShotId(shot.id))
    if (reel) dispatch(setDropReel(reel))
  }

  const onDragEndHandler = () => {
    // console.log('DragEnd', e.target)
  }

  const onReorderHandler = shots => {
    const updatedReel = { ...reel, shots: shots }
    console.log(
      'Updated Reel:  \t',
      updatedReel.shots.map(shot => shot?.code)
    )

    updateReel(updatedReel)
    setShotsOrdered(shots)
  }

  useEffect(() => {
    if (status === 'fulfilled') {
      refetchReels()
      console.log(
        'Reel:  \t\t',
        reel.shots.map(shot => shot?.code)
      )
    }
  }, [shotsOrdered])

  // console.log(status, isSuccessUpdateReel)

  /////////////////////////////////////////////////////////////////////

  return (
    <TimelineContainer>
      <div
        className={cn('title', { active: activeReelsIds.includes(reel.id) })}
        onClick={() => onTitleClickHandler(reel.id)}
      >
        {title} ({reel.shots?.length} shots)
      </div>

      <div className={'timelineRow'}>
        <div className={cn('timelineItems', { active: activeReelsIds.includes(reel.id) })}>
          <Reorder.Group
            as={'div'}
            axis={'x'}
            values={shotsOrdered}
            onReorder={e => onReorderHandler(e)}
            style={{ display: 'flex', gap: 4 }}
          >
            {shotsOrdered?.map(shot => (
              <Reorder.Item key={shot.id} value={shot}>
                <EntityCardShot entity={shot} isSelected={activeShotId === shot.id} />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
    </TimelineContainer>
  )
}
