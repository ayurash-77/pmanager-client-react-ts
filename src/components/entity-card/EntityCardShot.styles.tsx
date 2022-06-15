import styled from 'styled-components'

export const EntityCardShotContainer = styled.div`
  transition: 150ms;
  max-width: 160px;
  display: flex;
  gap: 4px;
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

    &.selected {
      opacity: 1;
      filter: contrast(110%);
      background: var(--shot-card-bg-selected);
      box-shadow: 0 2px 5px #00000060, inset 0 10px 20px var(--shot-card-selected-glow);
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
      background: var(--shot-card-bg);

      &.selected {
        color: var(--text-high2);
        opacity: 1;
      }
    }

    &.disabled {
      opacity: 0.7;
      filter: contrast(75%);
    }
  }

  &:hover .footer {
    color: var(--text-high);
    opacity: 1;
  }

  &:hover .thumbnail > .image {
    opacity: 0.8;
  }
`