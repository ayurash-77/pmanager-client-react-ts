import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: 10px;
`

export const PostBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const PostHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-content: center;
  min-height: 22px;
  padding: 3px 10px;
  border-top-left-radius: var(--rad);
  border-top-right-radius: var(--rad);
  background: var(--post-header-bg);
`

export const PostMessage = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--post-message-bg);
  height: 100%;
  border-bottom-left-radius: var(--rad);
  border-bottom-right-radius: var(--rad);

  .message {
    white-space: pre-wrap;
  }
`

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 8px;

  .tag {
    display: flex;
    max-width: max-content;
    align-items: center;
    gap: 5px;
    font-family: var(--ff-button);
    font-size: var(--fs-small3);
    font-weight: 500;
    cursor: pointer;
    background-color: var(--post-header-bg);
    padding: 2px 7px;
    border-radius: 50px;
    opacity: 0.9;
    color: var(--ribbon-reel-fg);
    &.shot {
      color: var(--ribbon-shot-fg);
    }
    &:hover {
      opacity: 1;
    }
  }
`

export const Username = styled.div`
  color: var(--user-email);
  cursor: pointer;
`
export const PostMenu = styled.div`
  cursor: default;
  position: relative;
  .menuOpen {
    display: flex;
    justify-content: center;
    width: 12px;
    height: 100%;
    margin-right: -10px;
    border-radius: 6px;
    cursor: pointer;
    margin-left: 4px;
    &:after {
      content: '';
      width: 3px;
      background: var(--button-bg-primary);
      border-radius: 4px;
    }
  }

  .menu {
    transition: 200ms ease-out;
    visibility: visible;
    position: absolute;
    z-index: 10;
    top: -2px;
    right: 2px;
    opacity: 1;
    height: max-content;
    padding: 4px;
    border-radius: 6px;
    border: 1px solid var(--contextMenu-border);
    background: var(--contextMenu-bg);
    backdrop-filter: blur(5px);
    box-shadow: 0 2px 15px #00000040;
    perspective: 20px;
    overflow: hidden;

    &.hide {
      opacity: 0;
      transform: translateY(-4px) scale(0.85);
    }

    .item {
      transition: 150ms;
      font-family: var(--ff-button);
      font-size: var(--fs-small1);
      white-space: nowrap;
      font-weight: 500;
      padding: 3px 10px;
      border-radius: 3px;
      :hover {
        color: var(--text-high2);
        background: var(--contextMenu-item-hover);
      }
    }
  }
`
