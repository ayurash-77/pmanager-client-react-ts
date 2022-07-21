import styled from 'styled-components'

export const Header = styled.div`
  border-radius: 6px 6px 0 0;
  background: var(--modal-header-bg);
  color: var(--modal-header-fg);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  font-weight: 400;
  font-size: var(--font-size-big1);
  padding: 10px 15px;
  width: 100%;
  &.warning {
    background: var(--accent);
  }
`

export const Body = styled.div`
  width: 100%;
  max-height: calc(100vh - 150px);
  overflow: auto;
  background: var(--header-bg);

  display: flex;
  flex-direction: column;
  padding: 15px;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const Footer = styled.div`
  width: 100%;
  padding: 10px 15px;
  border-radius: 0 0 6px 6px;
  background: var(--modal-footer-bg);
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
`