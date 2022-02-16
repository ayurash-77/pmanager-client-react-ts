import { createGlobalStyle } from 'styled-components'
import { appColors } from './App.colors'

export const AppStyles = createGlobalStyle`  

  @font-face {
    font-family: 'DIN_REG';
    src: url('../assets/fonts/PFDinDisplayPro-Reg.ttf') format('truetype');
  }
  
  :root {
    --sidebar-width-max: 180px;
    --sidebar-width-min: 55px;
    --topbar-height: 42px;

    /* Typography */
    --ff-main: 'Roboto', DIN_REG, sans-serif, 'Segoe UI', 'Ubuntu', 'Helvetica Neue';
    --ff-btn: 'Segoe UI', 'Ubuntu', 'Helvetica Neue';
    --ff-icon: DIN_REG, 'Segoe UI', sans-serif, 'Helvetica Neue';
    --fs-normal: 13px;
    --fs-small1: 11px;
    --fs-small2: 9px;
    --fs-big1: 15px;
    --fs-big2: 17px;

    --fw-light: 300;
    --fw-normal: 500;
    --fw-bold: 700;

    --rad: 4px;
    
    background: ${appColors.main.BG};
    --modal-overlay:    ${appColors.modal.OVERLAY};
    --modal-header-bg:  ${appColors.modal.HEADER_BG};
    --modal-header-fg:  ${appColors.modal.HEADER_FG};
    --modal-footer-bg:  ${appColors.modal.FOOTER_BG};
  }

  * {
    box-sizing: border-box
  }

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    background: ${appColors.scrollBar.BG};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${appColors.scrollBar.FG};
    border-radius: 4px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0; font-weight: var(--fw-normal); font-family: var(--ff-med);
  }

  div.hSpace, .hSpace { width: 10px; }
  div.vSpace, .vSpace { height: 10px; }

  .toolButtonTxt {
    font-family: var(--ff-btn);
    font-weight: var(--fw-bold);
    font-size: 11px;
    display: flex;
    flex-wrap: nowrap;
    text-transform: uppercase
  }
  
  body {
    margin: 0;
    font-family: var(--ff-main);
    font-size: var(--fs-normal);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    color: ${appColors.main.FG};
    background: ${appColors.main.BG};
    height: 100vh;
    width: 100vw;
    display: flex;
    overflow: hidden;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  input, select, option, textarea, .input {
    transition: all 150ms;
    font-size: var(--fs-normal);
    font-family: var(--ff-main);
    padding: 0 4px;
    color: ${appColors.text.MID};
    height: 22px;
    border-radius: 4px;
    background: ${appColors.input.BG};
    border: 1px solid ${appColors.input.BORDER};
    outline: none;
    box-shadow: 0 1px 3px ${appColors.input.SHADOW};
  }

  input:focus, textarea:focus {
    color: ${appColors.text.HIGH};
    border: 1px solid ${appColors.input.BORDER_FOCUS};
    box-shadow: 0 0 5px ${appColors.input.BORDER_FOCUS};
    background: ${appColors.input.BG_FOCUS};
  }
  
  .error {
    color: ${appColors.main.ACCENT};
    vertical-align: center;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    width: 100%;
  }
  .accent { color: ${appColors.main.ACCENT}; }
  .blue { color: ${appColors.main.BLUE50}; }
  .blueMed { color: ${appColors.main.BLUE60}; }
  .blueLight { color: ${appColors.main.BLUE70}; }

  .accentBg {
    /*font-weight: var(--fw-bold);*/
    color: ${appColors.text.HIGH};
    background: ${appColors.main.ACCENT};
    opacity: 1;
  }

  .accentBg:hover {
    color: ${appColors.text.HIGH2};
    background: ${appColors.main.ACCENT_BG};
    box-shadow: 0 0 8px ${appColors.main.ACCENT};
  }

  .accentBg:active {
    border: 1px solid ${appColors.main.ACCENT};
    background: ${appColors.main.ACCENT};
    opacity: 0.8;
  }

  .accentBg:focus {
    color: ${appColors.text.HIGH2};
    border: 1px solid ${appColors.main.ACCENT};
    box-shadow: 0 0 8px ${appColors.main.ACCENT_BG};
    opacity: 1;
  }
  
`
export default AppStyles
