import styled from 'styled-components'
import { FC } from 'react'

const Container = styled.div`
  .title {
    //text-transform: uppercase;
    margin-bottom: 4px;
    color: var(--ribbon-reel-fg);
    user-select: none;
    cursor: default;
  }

  .draggable {
    cursor: grab;
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
      min-width: 30px;
      display: flex;
      gap: 2px;
      align-items: center;
      border: solid 1px var(--timeline-reel-border);
      box-shadow: 0 0 3px var(--timeline-reel-border);
      border-radius: 5px;
      padding: 3px;

      overflow-y: hidden;
      overflow-x: auto;
      opacity: 1;
    }
  }
`

interface ITimelineWrapper {
  title: string
}

export const TimelineWrapper: FC<ITimelineWrapper> = ({ title, children }) => {
  return (
    <Container>
      <h4 className={'title'}>{title}</h4>
      <div className={'body'}>
        <div className={'timeline'}>{children}</div>
      </div>
    </Container>
  )
}
