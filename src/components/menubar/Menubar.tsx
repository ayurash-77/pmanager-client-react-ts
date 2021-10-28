import { Dispatch, FC } from 'react'
import styled from 'styled-components'

interface Props {
  isMenubarExpanded: boolean
}

interface PropsMenubar extends Props {
  toggle: Dispatch<any>
}

const Container = styled.div<Props>`
  transition: all 250ms;
  width: ${p => (p.isMenubarExpanded ? 'var(--sidebar-width-max)' : 'var(--sidebar-width-min)')};
  min-width: ${p => (p.isMenubarExpanded ? 'var(--sidebar-width-max)' : 'var(--sidebar-width-min)')};
  background-color: var(--navbar-bg);
  padding: 10px;
  display: flex;
  flex-direction: column;
`

const ToggleContainer = styled.div<Props>`
  transition: 200ms;
  align-self: center;
  height: 20px;
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  opacity: 0.2;

  &:after {
    transition: width 200ms;
    content: '';
    height: 4px;
    width: ${p => (p.isMenubarExpanded ? '72px' : '32px')};
    position: absolute;
    border-radius: 4px;
    margin-top: -2px;
    background: var(--fg-normal);
  }

  &:active {
    color: var(--navbar-fg-selected);
    opacity: 1;
  }

  &:hover {
    color: var(--navbar-fg-selected);
    cursor: pointer;
    opacity: 0.5;
  }
`

// @ts-ignore
export const Menubar: FC<PropsMenubar> = ({ isMenubarExpanded, toggle, children }) => {
  return (
    <Container isMenubarExpanded={isMenubarExpanded}>
      {children}
      <ToggleContainer isMenubarExpanded={isMenubarExpanded} onClick={toggle} />
    </Container>
  )
}

export default Menubar
