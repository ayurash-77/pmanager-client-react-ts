import { DetailedHTMLProps, Dispatch, FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { BottomMenu } from '../components/menubar/BottomMenu'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  menubarExpanded: boolean
}

interface IMenubar extends Props {
  toggle: Dispatch<any>
}

const Container = styled.div<Props>`
  transition: 250ms;
  width: ${p => (p.menubarExpanded ? 'var(--sidebar-width-max)' : 'var(--sidebar-width-min)')};
  min-width: ${p => (p.menubarExpanded ? 'var(--sidebar-width-max)' : 'var(--sidebar-width-min)')};
  padding: 10px;
  display: grid;
  flex-direction: column;
  grid-template-rows: auto auto 1fr;
  height: 100%;
  z-index: 5;
  background-color: var(--menubar-bg);
`

const ToggleContainer = styled.div<Props>`
  transition: 200ms;
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  margin-top: 4px;
  opacity: 0.2;

  &:after {
    transition: width 200ms;
    content: '';
    height: 4px;
    width: ${p => (p.menubarExpanded ? '70px' : '20px')};
    position: absolute;
    border-radius: 4px;

    background: var(--main-fg);
  }

  &:active {
    color: var(--menubar-fg-selected);
    opacity: 1;
  }

  &:hover {
    color: var(--menubar-fg-selected);
    cursor: pointer;
    opacity: 0.5;
  }
`

export const Menubar: FC<IMenubar> = ({ menubarExpanded, toggle, children, ...props }: IMenubar) => {
  return (
    <Container menubarExpanded={menubarExpanded}>
      {children}
      <ToggleContainer menubarExpanded={menubarExpanded} onClick={toggle} />
      <BottomMenu menubarExpanded={menubarExpanded} />
    </Container>
  )
}

export default Menubar
