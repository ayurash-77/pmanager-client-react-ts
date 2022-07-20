import styled from 'styled-components'

export const EntityCardReelContainer = styled.div`
  transition: 150ms;
  max-width: 160px;
  display: flex;
  gap: 4px;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 2px;
  margin-right: 2px;
  user-select: none;

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
        width: 80px;
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
      background: var(--reel-card-bg);
    }
  }

  .info {
    transition: all 200ms;
    max-height: 60px;
    font-size: var(--fs-small2);
    color: var(--text-high);
    display: grid;
    grid-template-rows: auto 1fr auto;
    flex-direction: column;
    justify-content: space-between;
    margin: 1px 3px 0 0;

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

  &.selected {
    border: 2px solid var(--reel-card-selected-border);
    box-shadow: 1px 2px 4px #00000030;
  }

  &:hover .main,
  &.selected .main {
    opacity: 1;
    filter: contrast(110%);
    background: var(--reel-card-bg-selected);
    box-shadow: inset 0 10px 20px var(--reel-card-selected-glow);
  }

  &:hover .info,
  &.selected .info {
    color: var(--text-high2);
    opacity: 1;
  }

  &:hover .footer,
  &.selected .footer {
    color: var(--white-90);
    opacity: 1;
  }

  &:hover .thumbnail > .image {
    opacity: 0.8;
  }
`
