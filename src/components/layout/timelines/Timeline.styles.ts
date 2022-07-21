import styled from 'styled-components'

export const TimelineContainer = styled.div`
  margin-bottom: 5px;
  margin-right: -5px;
  display: flex;
  flex-direction: column;

  .code {
    font-weight: 500;
    display: flex;
    align-items: center;
    height: 20px;
    color: var(--text-high);
    cursor: pointer;
    gap: 5px;
    margin: 0 2px;

    &.active {
      color: var(--ribbon-reel-fg);
      opacity: 1;
    }
    .name {
      display: flex;
      gap: 5px;
      color: var(--text-mid);
    }
    .shotsCount {
      display: flex;
      gap: 5px;
      color: var(--text-mid);
      font-weight: 400;
    }
  }

  .timelineRow {
    display: flex;
    align-items: flex-start;

    .timelineItemsButtons {
      display: flex;
      gap: 4px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      padding: 2px;
      background: var(--timeline-row-bg);
      box-shadow: inset 0 2px 5px var(--timeline-row-shadow-inner);
      border: solid 1px var(--timeline-row-border);
    }

    .timelineItemsRow {
      display: flex;
      border-radius: 8px;
      border: solid 1px var(--timeline-row-border);
      box-shadow: inset 0 2px 5px var(--timeline-row-shadow-inner);
      background: var(--timeline-row-bg);
      padding: 2px;
      margin: 0 -1px;
      overflow: auto;

      .timelineItems {
        //transition: 200ms;
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
  }

  .code:hover ~ .timelineItemsRow > .timelineItems {
    border: solid 2px var(--timeline-border-active);
  }

  .draggable {
    cursor: grab;
  }
`
