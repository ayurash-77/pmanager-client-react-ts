import styled from 'styled-components'
import { appColors } from '../../app/App.colors'

export interface IProjectCardStyled {
  selected: boolean
}

export const Container = styled.div<IProjectCardStyled>`
  user-select: none;
  width: 160px;
  border-radius: 4px;
  margin: 10px;
  color: ${appColors.main.FG};

  .imageContainer {
    transition: opacity 200ms;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 90px;
    border-radius: 4px;
    color: ${appColors.projectCard.DUMMY_FG};
    background: ${appColors.projectCard.DUMMY_BG};
    opacity: ${p => (p?.selected ? 1 : 0.8)};
    box-shadow: 0 1px 3px #00000020;
    overflow: hidden;
  }

  .infoContainer {
    transition: background 200ms;
    border-radius: 4px;
    padding: 2px;
    background: ${p => (p.selected ? appColors.projectCard.INFO_BG_SELECTED : appColors.projectCard.INFO_BG)};
    box-shadow: 0 1px 3px #00000020;
  }
  :hover .infoContainer {
    background: ${p =>
      p.selected ? appColors.projectCard.INFO_BG_SELECTED : appColors.projectCard.INFO_BG_HOVER};
  }

  :hover .imageContainer {
    opacity: 1;
  }
`
