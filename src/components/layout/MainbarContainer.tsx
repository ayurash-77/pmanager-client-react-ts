import styled from 'styled-components'

export const MainbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  min-height: 0;

  .collapses {
    &:after {
      content: '';
      background: var(--post-message-bg);

      display: flex;
      height: 1px;
    }
    box-shadow: 0 1px 5px var(--contextMenu-shadow);
    z-index: 1;
  }
`
