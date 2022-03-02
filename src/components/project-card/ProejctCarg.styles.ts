import styled from 'styled-components'

export const Container = styled.div`
  user-select: none;
  width: 160px;
  border-radius: 4px;
  margin: 10px;
  color: var(--main-fg);

  .imageContainer {
    transition: opacity 200ms;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 90px;
    border-radius: 4px;
    color: var(--pc-dummy-fg);
    background: var(--pc-dummy-bg);
    opacity: 0.8;
    box-shadow: 0 1px 3px #00000020;
    overflow: hidden;
    &.selected {
      opacity: 1;
    }
  }

  .infoContainer {
    transition: background 200ms;
    border-radius: 4px;
    padding: 2px;
    background: var(--pc-info-bg);
    box-shadow: 0 1px 3px #00000020;
    &.selected {
      background: var(--pc-info-bg-selected);
    }
  }

  :hover .infoContainer {
    background: var(--pc-info-bg-hover);
    &.selected {
      background: var(--pc-info-bg-selected);
    }
  }

  :hover .imageContainer {
    opacity: 1;
  }
`
