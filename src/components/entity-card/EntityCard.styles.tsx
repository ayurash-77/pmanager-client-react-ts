import styled from 'styled-components'

export const EntityCardContainer = styled.div`
  transition: all 200ms;
  height: 60px;
  max-width: 140px;

  display: flex;
  gap: 4px;
  //background: var(--pc-info-bg);
  border-radius: var(--rad);
  //overflow: hidden;

  .main {
    min-width: 80px;
    height: 60px;
    border-radius: var(--rad);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: var(--ff-entity-card);
    font-size: var(--fs-small2);
    box-shadow: 0 1px 2px #00000050;

    .thumbnail {
      display: flex;
      align-items: center;
      position: relative;
      height: 45px;
      max-height: 45px;
      width: 80px;
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
      height: 14px;
      color: var(--entity-footer-fg);
      display: flex;
      justify-content: center;
      align-items: center;

      &.reel {
        background: var(--reel-card-bg);
      }

      &.seq {
        background: var(--seq-card-bg);
      }

      &.shot {
        background: var(--shot-card-bg);
      }
    }
  }
  .info {
    transition: all 200ms;
    font-size: var(--fs-small2);
    color: var(--text-high);
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr auto;
    opacity: 0.8;

    .infoSeq {
      display: flex;
      gap: 4px;
      align-items: flex-end;
      color: var(--seq-card-icon-fg);
    }
    .infoSeqTitle {
      display: flex;
      gap: 4px;
      //align-items: flex-end;
      color: var(--seq-card-title-fg);
    }
    .infoShot {
      display: flex;
      gap: 4px;
      align-items: flex-end;
      color: var(--shot-card-icon-fg);
    }
  }
  &:hover .info {
    color: var(--text-high2);
    opacity: 1;
  }

  &:hover .footer {
    opacity: 1;
  }
  &:hover .thumbnail > .image {
    opacity: 0.8;
  }
  &:hover {
    filter: contrast(110%);
  }
`
