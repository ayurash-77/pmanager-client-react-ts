import styled from 'styled-components'

export const TimelineContainer = styled.div`
  //padding: 5px 0;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;

  .title {
    font-weight: 500;
    display: flex;
    align-items: center;
    height: 20px;
    color: var(--text-mid);
    cursor: pointer;
    gap: 5px;
    margin: 0 2px;

    &.active {
      color: var(--ribbon-reel-fg);
      opacity: 1;
    }
  }

  .timelineRow {
    display: flex;

    border-radius: 8px;
    border: solid 1px var(--timeline-row-border);
    box-shadow: inset 0 2px 5px var(--timeline-row-shadow-inner);
    background: var(--timeline-row-bg);
    padding: 2px;
    margin: 0 -1px;

    .timelineItems {
      transition: 200ms;
      min-width: 20px;
      min-height: 66px;
      display: flex;
      gap: 2px;
      align-items: center;
      border: solid 2px var(--timeline-border);
      border-radius: 6px;
      padding: 2px;
      opacity: 0.8;

      overflow-y: hidden;
      overflow-x: auto;
      &::-webkit-scrollbar-track {
        margin: 2px;
      }

      &.active {
        border: solid 2px var(--timeline-border-active);
        opacity: 1;
      }
    }
  }

  .title:hover ~ .timelineRow > .timelineItems {
    border: solid 2px var(--timeline-border-active);
  }

  .draggable {
    cursor: grab;
  }
`
