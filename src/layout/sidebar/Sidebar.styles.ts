import styled from 'styled-components'

interface ISidebarStyled {
  sidebarShow: boolean
}

export const SideBarContainer = styled.div<ISidebarStyled>`
  transition: width 250ms;
  width: 480px;
  z-index: 5;
  display: inline-block;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: var(--sidebar-bg);
  &.hide {
    width: 0;
  }
`

export const SidebarBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6px 3px 15px 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  overflow: hidden;
  overflow-y: auto;
  height: 90%;
`

export const SidebarToolBarContainer = styled.div`
  height: var(--topbar-width);
  min-height: var(--topbar-width);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
`
export const SidebarBlockContainer = styled.div`
  margin-bottom: 10px;
  font-size: var(--fs-small1);
`

export const SidebarBlockTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  margin: 5px 0;
  color: var(--text-low);
`
