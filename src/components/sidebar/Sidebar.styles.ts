import styled from 'styled-components'
import { appColors } from '../../app/App.colors'

interface ISidebarStyled {
  sidebarShow: boolean
}

export const SideBarContainer = styled.div<ISidebarStyled>`
  transition: width 250ms;
  width: ${p => (p.sidebarShow ? '50%' : '0')};
  z-index: 3;
  white-space: nowrap;
  overflow: hidden;
  background-color: ${appColors.sidebar.BG};
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

export const Title = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  margin: 5px 0;
  color: ${appColors.text.LOW};
`
export const SidebarTableContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;
  z-index: 6;
  white-space: nowrap;
  overflow: auto;
  border-radius: 4px;
  border: solid 1px ${appColors.table.BORDER};
`
export const SidebarTable = styled.table`
  font-size: var(--font-size-small1);
  width: 100%;
  border-collapse: collapse;
  background: transparent;

  tr {
    transition: background 200ms;
    border-radius: 14px;
    cursor: default;
    height: 20px;
    background: ${appColors.table.BG_ROW1};

    &:nth-of-type(even) {
      background: ${appColors.table.BG_ROW2};
    }

    &.hover {
      color: ${appColors.text.HIGH};
      text-overflow: ellipsis;
      overflow: hidden;
      :hover {
        background: ${appColors.table.BG_ROW_HOVER};
        color: ${appColors.text.HIGH2};
      }
    }
    &.link {
      :hover {
        cursor: pointer;
      }
    }
  }

  th {
    text-align: left;
    white-space: nowrap;
    height: 20px;
    background: ${appColors.table.HEADER_BG};
    padding: 4px;
    font-weight: 500;
    color: ${appColors.table.HEADER_FG};
    user-select: none;
  }
  td {
    transition: color 150ms;
    padding: 0 5px;
    text-align: left;

    &.date {
      color: ${appColors.main.BLUE60};
    }
    &.info {
      color: ${appColors.text.MID};
    }
    &.link {
      opacity: 0.8;
      :hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
`
