import { FC } from 'react'
import styled from 'styled-components'

interface ISidebar {
  sidebarShow: boolean
}

const SideBarContainer = styled.div<ISidebar>`
  transition: width 250ms;
  width: ${p => (p.sidebarShow ? '40%' : '0')};
  z-index: 3;
  white-space: nowrap;
  overflow: auto;
  overflow-x: hidden;
  background-color: var(--navbar-bg);
`

export const Sidebar: FC<ISidebar> = props => {
  return (
    <SideBarContainer {...props}>
      <h2>SIDEBAR SIDEBAR</h2>
    </SideBarContainer>
  )
}

export default Sidebar
