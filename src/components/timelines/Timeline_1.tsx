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
import { useGetReelsByProjectIdQuery, useUpdateReelMutation } from '../../store/api/reels.api'
import { useGetShotsByReelIdQuery } from '../../store/api/shots.api'

interface ITimelineWrapper {
  title: string
  reel: IReel
}

export const Timeline: FC<ITimelineWrapper> = ({ title, reel }) => {
  const dispatch = useAppDispatch()

  const { activeProjectId, activeReelsIds, activeShotId } = useAppSelector(state => state.entities)
  const {
    data: reels,
    refetch: refetchReels,
    status: statusReels,
  } = useGetReelsByProjectIdQuery(activeProjectId)

  const { data: shots, status: statusShots } = useGetShotsByReelIdQuery(reel.id)

  const [updateReel, { isSuccess: isSuccessUpdateReel, data: reelUpdated }] = useUpdateReelMutation()

  const onTitleClickHandler = id => {
    dispatch(setActiveReelsIds(activeReelsIds.length === 1 && activeReelsIds[0] === id ? [] : [id]))
    dispatch(setActiveShotId(null))
    dispatch(setActiveReelsTypeId(null))
  }

  const [shotsOrdered, setShotsOrdered] = useState([])

  const onShotClickHandler = id => {
    const currentShotId = activeShotId === id ? null : id
    dispatch(setActiveShotId(currentShotId))
    const reelsIds = reels
      ?.filter(reel => reel.shots?.find(shot => shot.id === currentShotId))
      .map(reel => reel.id)
    dispatch(setActiveReelsIds(reelsIds))
  }

  const onDragStartHandler = (e, shot: IShot, reel?: IReel) => {
    dispatch(setDragShot(shot))
    dispatch(setActiveShotId(shot.id))
    if (reel) dispatch(setDropReel(reel))
  }

  const onDragEndHandler = e => {
    // console.log('DragEnd', e.target)
  }

  const onReorderHandler = e => {
    setShotsOrdered(e)
  }

  useEffect(() => {
    if (statusShots === 'fulfilled') {
      setShotsOrdered(shots)
      console.log('setShotsOrdered')
    }
  }, [shots, statusShots])

  useEffect(() => {
    updateReel({ ...reel, shots: shotsOrdered })
    console.log('updateReel')
  }, [shotsOrdered])

  console.log(reelUpdated, reel)

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
            // as={'div'}
            axis={'x'}
            values={shotsOrdered}
            onReorder={setShotsOrdered}
            style={{ display: 'flex', gap: 4 }}
          >
            {shotsOrdered?.map(shot => (
              <Reorder.Item key={shot.id} value={shot}>
                {/* <div */}
                {/*   key={shot.id} */}
                {/*   draggable={true} */}
                {/*   className={'draggable'} */}
                {/*   onClick={() => onShotClickHandler(shot.id)} */}
                {/*   onDragStart={e => onDragStartHandler(e, shot, reel)} */}
                {/*   onDragEnd={e => onDragEndHandler(e)} */}
                {/*   onDragOver={e => e.preventDefault()} */}
                {/* > */}
                <EntityCardShot entity={shot} isSelected={activeShotId === shot.id} />
                {/* </div> */}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
    </TimelineContainer>
  )
}
