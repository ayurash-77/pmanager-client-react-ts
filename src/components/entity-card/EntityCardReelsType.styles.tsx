import styled from 'styled-components'

export const EntityCardReelsTypeContainer = styled.div`
  transition: 150ms;
  display: flex;
  gap: 4px;
  cursor: default;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 2px;
  user-select: none;

  &.selected {
    border: 2px solid var(--reelsType-card-selected-border);
    box-shadow: 1px 2px 4px #00000030;
  }

  .main {
    transition: 150ms;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    padding: 2px 6px;
    background: var(--reelsType-card-bg);
    border-radius: var(--rad);
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--reelsType-card-fg);
    opacity: 0.8;
    text-shadow: 0 1px 2px #00000090;

    &.selected {
      opacity: 1;
      color: var(--reelsType-card-fg-selected);
      //box-shadow: 0 2px 5px #00000060, inset 0 8px 30px var(--reelsType-card-selected-glow);
    }

    .code {
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;

      //color: var(--entity-footer-fg);
    }
    .name {
      opacity: 0.7;
      font-size: var(--fs-small1);
      display: flex;
      width: 60px;
      max-width: 80px;
      justify-content: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .info {
    transition: 150ms;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    opacity: 0.75;

    .infoRow {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-right: 3px;
    }

    &.selected {
      opacity: 1;
      color: var(--text-high);
    }
  }

  &:hover .main,
  &:hover .info,
  &.selected .main {
    color: var(--text-high);
    opacity: 1;
  }
`

export const EntityCardReelsTypeContainer1 = styled.div`
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
      background: var(--reelsType-card-bg-selected);
      box-shadow: 0 2px 5px #00000060, inset 0 10px 20px var(--reelsType-card-selected-glow);
    }

    .thumbnail {
      display: flex;
      align-items: center;
      height: 100%;
      overflow: hidden;
      background: var(--entity-card-bg);

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
      background: var(--reelsType-card-bg);
    }

    &.disabled {
      opacity: 0.7;
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
  }

  &:hover .thumbnail > .image {
    opacity: 0.8;
  }
`
