import { DetailedHTMLProps, Dispatch, FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { BottomMenu } from '../components/menubar/BottomMenu'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isMenubarExpanded: boolean
}

interface IMenubar extends Props {
  toggle: Dispatch<any>
}

const Container = styled.div<Props>`
  transition: all 250ms;
  width: ${p => (p.isMenubarExpanded ? 'var(--sidebar-width-max)' : 'var(--sidebar-width-min)')};
  min-width: ${p => (p.isMenubarExpanded ? 'var(--sidebar-width-max)' : 'var(--sidebar-width-min)')};
  padding: 10px;
  display: flex;
  height: 100vh;
  flex-direction: column;

  .vSeparator {
    height: 100%;
  }
`

const ToggleContainer = styled.div<Props>`
  transition: 200ms;
  align-self: center;
  height: 30px;
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

export const Menubar: FC<IMenubar> = ({ isMenubarExpanded, toggle, children, ...props }: IMenubar) => {
  return (
    <div {...props}>
      <Container isMenubarExpanded={isMenubarExpanded}>
        {children}
        <ToggleContainer isMenubarExpanded={isMenubarExpanded} onClick={toggle} />
        <div className={'vSeparator'} />
        <BottomMenu isMenubarExpanded={isMenubarExpanded} />
      </Container>
    </div>
  )
}

export default Menubar
