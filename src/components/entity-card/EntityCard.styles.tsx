import styled from 'styled-components'

export const EntityCardContainer = styled.div`
  transition: 150ms;
  max-width: 160px;
  display: flex;
  gap: 4px;

  .main {
    transition: 150ms;
    min-width: 80px;
    height: 60px;

    display: flex;
    flex-direction: column;

    font-family: var(--ff-entity-card);
    font-size: var(--fs-small2);

    border-radius: var(--rad);
    overflow: hidden;
    box-sizing: content-box;

    &.selected {
      opacity: 1;
      filter: contrast(110%);

      &.shot {
        background: var(--shot-card-bg-selected);
        box-shadow: 0 2px 5px #00000060, inset 0 10px 20px var(--shot-card-selected-glow);
      }

      &.reel {
        background: var(--reel-card-bg-selected);
        box-shadow: 0 2px 5px #00000060, inset 0 10px 20px var(--reel-card-selected-glow);
      }

      &.reelsType {
        background: var(--reelsType-card-bg-selected);
        box-shadow: 0 2px 5px #00000060, inset 0 10px 20px var(--reelsType-card-selected-glow);
      }
    }

    .thumbnail {
      display: flex;
      align-items: center;
      height: 100%;
      overflow: hidden;
      background: var(--entity-card-bg);

      .icon-bg {
        position: absolute;
        display: flex;
        top: -1px;
        right: -1px;
        background: var(--entity-card-icon-bg);
        border-bottom-left-radius: 4px;
        color: var(--text-high);
        padding: 3px 4px;
      }

      .image {
        transition: opacity 200ms;
        opacity: 0.6;
      }
    }

    .footer {
      transition: opacity 100ms;
      opacity: 0.8;
      height: 20px;
      color: var(--entity-footer-fg);
      display: flex;
      justify-content: center;
      align-items: center;

      &.reelsType {
        background: var(--reelsType-card-bg);
      }

      &.reel {
        background: var(--reel-card-bg);
      }

      &.shot {
        background: var(--shot-card-bg);
      }
    }

    &.disabled {
      opacity: 0.5;
      filter: contrast(75%);
    }
  }

  .info {
    transition: all 200ms;
    max-height: 60px;
    font-size: var(--fs-small2);
    color: var(--text-high);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    opacity: 0.8;

    .infoTitle {
      text-overflow: ellipsis;
      max-height: 28px;
      min-width: 40px;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .infoReel {
      display: flex;
      gap: 4px;
      align-items: flex-end;
      color: var(--reel-card-icon-fg);
    }

    .infoReelTitle {
      display: flex;
      gap: 4px;
      white-space: nowrap;
      color: var(--reel-card-title-fg);
    }

    .infoShot {
      display: flex;
      gap: 4px;
      align-items: flex-end;
      color: var(--shot-card-icon-fg);
    }

    &.selected {
      opacity: 1;
      color: var(--text-high2);
    }
  }

  &:hover .info,
  &.selected .info {
    color: var(--text-high2);
    opacity: 1;
  }

  .selected .footer {
    opacity: 1;
    //filter: contrast(110%);
  }

  &:hover .thumbnail > .image {
    opacity: 0.8;
  }
`
