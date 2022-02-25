import { createGlobalStyle } from 'styled-components'
import { appColors } from './App.colors'

export const AppStyles = createGlobalStyle`  
  
  :root {
    
    background: ${appColors.main.BG};
    --modal-overlay:    ${appColors.modal.OVERLAY};
    
    --modal-header-bg:  ${appColors.modal.HEADER_BG};
    --modal-header-fg:  ${appColors.modal.HEADER_FG};
    --modal-footer-bg:  ${appColors.modal.FOOTER_BG};    
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0; font-weight: var(--fw-normal); font-family: var(--ff-med);
  }
  
  .blue { color: ${appColors.main.BLUE50}; }
  .blueMed { color: ${appColors.main.BLUE60}; }
  .blueLight { color: ${appColors.main.BLUE70}; }    
`
export default AppStyles
