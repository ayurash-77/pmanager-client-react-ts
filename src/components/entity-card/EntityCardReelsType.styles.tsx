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
  position: relative;

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
  &.selected .main {
    color: var(--reelsType-card-fg-selected);
    opacity: 1;
  }

  &:hover .info,
  &.selected .info {
    color: var(--text-high);
    opacity: 1;
  }
`
