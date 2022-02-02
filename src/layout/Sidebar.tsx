import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import styled from 'styled-components'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sidebarShow: boolean
}

const SideBarContainer = styled.div<Props>`
  background-color: #0c0d16;
`

export const Sidebar: FC<Props> = ({ sidebarShow, ...props }): JSX.Element => {
  return (
    <div {...props}>
      <SideBarContainer sidebarShow={sidebarShow}>
        <h2>SIDEBAR SIDEBAR</h2>
      </SideBarContainer>
    </div>
  )
}

export default Sidebar
