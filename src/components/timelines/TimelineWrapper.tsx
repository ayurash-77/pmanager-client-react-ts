import styled from 'styled-components'
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IReel } from '../../interfaces/IReel'
import { setActiveReelId } from '../../store/reducers/entities.reducer'
import { setActiveMenu } from '../../store/reducers/ui.reducer'
import cn from 'classnames'

const Container = styled.div`
  .title {
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    color: var(--text-mid);
    //user-select: none;
    cursor: default;

    &.link {
      cursor: pointer;
      color: var(--ribbon-reel-fg);
      //opacity: 0.9;
      &:hover {
        opacity: 1;
      }
      &:hover ~ .body > .timeline {
        background: var(--timeline-reel-bg-hover);
        border: solid 2px var(--timeline-reel-border-hover);
        //box-shadow: 0 0 3px var(--timeline-reel-border-hover);
        opacity: 1;
      }
    }
  }

  .body {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    min-height: 62px;
    border-radius: 5px;
    border: solid 1px var(--timeline-border);
    //box-shadow: 0 1px 5px var(--timeline-border);
    background: var(--timeline-bg);

    .timeline {
      transition: 250ms;
      min-width: 30px;
      display: flex;
      gap: 2px;
      align-items: center;
      border: solid 2px var(--timeline-reel-border);
      //box-shadow: 0 0 3px var(--timeline-reel-border);
      border-radius: 5px;
      padding: 3px;

      overflow-y: hidden;
      overflow-x: auto;
      opacity: 1;
    }
  }

  .draggable {
    cursor: grab;
  }
`

interface ITimelineWrapper {
  title: string
  reel: IReel
}

export const TimelineWrapper: FC<ITimelineWrapper> = ({ title, reel, children }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { activeProjectId } = useAppSelector(state => state.projects)
  const { activeReelId } = useAppSelector(state => state.entities)

  const onTitleClickHandler = () => {
    if (!activeReelId) {
      dispatch(setActiveMenu('reels'))
      dispatch(setActiveReelId(reel.id))
      navigate(`/project/${activeProjectId}/reels/${reel.id}`)
    }
  }

  const onReelsClickHandler = () => {
    if (activeReelId) {
      dispatch(setActiveMenu('reels'))
      dispatch(setActiveReelId(null))
      navigate(`/project/${activeProjectId}/reels`)
    }
  }

  return (
    <Container>
      <div className={cn('title', { link: !activeReelId })} onClick={onTitleClickHandler}>
        {title}
        {activeReelId && (
          <span className={cn('title', { link: activeReelId })} onClick={onReelsClickHandler}>
            all reels
          </span>
        )}
      </div>

      <div className={'body'}>
        <div className={'timeline'}>{children}</div>
      </div>
    </Container>
  )
}
