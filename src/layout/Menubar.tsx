import { DetailedHTMLProps, Dispatch, FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { BottomMenu } from '../components/menubar/BottomMenu'
import { appColors } from '../app/App.colors'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isMenubarExpanded: boolean
}

interface IMenubar extends Props {
  toggle: Dispatch<any>
}

const Container = styled.div<Props>`
  transition: 250ms;
  width: ${p => (p.isMenubarExpanded ? 'var(--sidebar-width-max)' : 'var(--sidebar-width-min)')};
  min-width: ${p => (p.isMenubarExpanded ? 'var(--sidebar-width-max)' : 'var(--sidebar-width-min)')};
  padding: 10px;
  display: grid;
  flex-direction: column;
  grid-template-rows: auto auto 1fr;
  height: 100%;
  z-index: 3;
  background-color: ${appColors.menubar.BG};
`

const ToggleContainer = styled.div<Props>`
  transition: 200ms;
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  margin-top: 4px;
  opacity: 0.2;

  &:after {
    transition: width 200ms;
    content: '';
    height: 4px;
    width: ${p => (p.isMenubarExpanded ? '70px' : '20px')};
    position: absolute;
    border-radius: 4px;

    background: ${appColors.main.FG};
  }

  &:active {
    color: ${appColors.menubar.FG_SELECTED};
    opacity: 1;
  }

  &:hover {
    color: ${appColors.menubar.FG_SELECTED};
    cursor: pointer;
    opacity: 0.5;
  }
`

export const Menubar: FC<IMenubar> = ({ isMenubarExpanded, toggle, children, ...props }: IMenubar) => {
  return (
    <Container isMenubarExpanded={isMenubarExpanded}>
      {children}
      <ToggleContainer isMenubarExpanded={isMenubarExpanded} onClick={toggle} />
      <BottomMenu isMenubarExpanded={isMenubarExpanded} />
    </Container>
  )
}

export default Menubar
