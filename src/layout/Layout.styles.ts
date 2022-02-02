import styled from 'styled-components'

interface Props {
  sidebarShow: boolean
}

export const LayoutContainer = styled.div<Props>`
  transition: color 250ms;
  display: flex;
  //min-height: 100vh;
  width: 100vw;
  //display: grid;
  //grid-template-columns: min-content 1fr auto;
  //grid-template-rows: auto 1fr auto;
  //grid-template-areas:
  //  'menubar header sidebar'
  //  'menubar body sidebar'
  //  'menubar footer sidebar';

  .mainbar {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .header {
    //grid-area: header;
    padding: 8px 10px;
    display: flex;
    justify-content: space-between;
    background-color: var(--bg-header);
    z-index: 2;
    box-shadow: 0 1px 8px var(--btn-shadow);
  }

  .menubar {
    //grid-area: menubar;
    z-index: 3;
    background-color: var(--navbar-bg);
  }

  .body {
    //grid-area: body;
    z-index: 1;
    padding: 10px;
    height: 100%;

    overflow: auto;
  }

  .sidebar {
    //grid-area: sidebar;
    transition: width 250ms;
    width: ${p => (p.sidebarShow ? '40%' : '0')};
    z-index: 3;
    white-space: nowrap;
    overflow: auto;
    overflow-x: hidden;
    background-color: var(--navbar-bg);
  }

  .footer {
    //grid-area: footer;
    height: 30px;
    display: flex;
    align-items: center;
    background-color: var(--bg-header);
  }
`
