import styled from 'styled-components'
import { IProjectCardStyled } from '../project-card/ProejctCarg.styles'
import { appColors } from '../../app/App.colors'
import { ITheme } from '../../store/reducers/ui.reducer'

interface ITitleStyled {
  align?: 'left' | 'right' | 'center'
  margin?: number
  statusColor?: ({ theme }: ITheme) => string
}

export const InfoProjectTitleContainer = styled.div<ITitleStyled>`
  font-size: var(--font-size-normal);
  font-weight: 500;
  text-align: ${p => (p.align ? p.align : 'center')};
  margin: ${p => (p.margin ? p.margin + 'px' : '4px')} 2px;
  color: ${p => p.statusColor || appColors.text.HIGH};
  .accent {
    &:after {
      content: '! ';
    }
    color: ${appColors.main.ACCENT};
    font-weight: 600;
  }
`

export interface IInfoElementsStyled {
  selected?: boolean
  colorFg?: ({ theme }: ITheme) => string
  colorBg?: ({ theme }: ITheme) => string
}

export const InfoGrid = styled.div`
  font-size: var(--fs-small1);
  display: grid;
  gap: 2px;
  margin: 4px 2px;
  grid-template-columns: auto auto;
`

export const Label = styled.div`
  text-align: right;
  color: ${appColors.text.LOW};
  &:after {
    content: ':';
    margin-left: 1px;
    margin-right: 5px;
  }
`
export const Value = styled.div<IInfoElementsStyled>`
  color: ${p => p.colorFg || appColors.text.MID};
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
`
export const ValueStatus = styled.div<IInfoElementsStyled>`
  color: ${p => p.colorFg || appColors.text.MID};
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
`
