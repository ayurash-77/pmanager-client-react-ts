import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IReel } from '../../interfaces/IReel'
import {
  setActiveReelsIds,
  setActiveReelsTypeId,
  setActiveShotId,
} from '../../store/reducers/entities.reducer'
import { TimelineContainer } from './Timeline.styles'
import cn from 'classnames'

interface ITimelineWrapper {
  title: string
  reel: IReel
}

export const Timeline: FC<ITimelineWrapper> = ({ title, reel, children }) => {
  const dispatch = useAppDispatch()

  const { activeReelsIds } = useAppSelector(state => state.entities)

  const onTitleClickHandler = id => {
    dispatch(setActiveReelsIds(activeReelsIds.length === 1 && activeReelsIds[0] === id ? [] : [id]))
    dispatch(setActiveShotId(null))
    dispatch(setActiveReelsTypeId(null))
  }

  return (
    <TimelineContainer>
      <div
        className={cn('title', { active: activeReelsIds.includes(reel.id) })}
        onClick={() => onTitleClickHandler(reel.id)}
      >
        {title} ({reel.shots?.length} shots)
      </div>

      <div className={'timelineRow'}>
        <div className={cn('timelineItems', { active: activeReelsIds.includes(reel.id) })}>{children}</div>
      </div>
    </TimelineContainer>
  )
}
