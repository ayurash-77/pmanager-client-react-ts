import styled from 'styled-components'
import { FC } from 'react'
import { QuartersItem } from './QiartersIem'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setQuarterFilter } from '../../store/reducers/projects.reducer'
import { appColors } from '../../app/App.colors'

interface IQuartersItem {
  isMenubarExpanded: boolean
}

const Container = styled.div<IQuartersMenu>`
  transition: 150ms;
  border: solid 1px ${appColors.table.BORDER};
  border-radius: 4px;
  background: ${appColors.menubar.SUBMENU_BG1};
  margin-top: 1px;
  display: flex;
  flex-direction: column;
  opacity: ${p => (p?.isMenuShow ? '1' : '0')};
  height: ${p => (p.isMenuShow ? 'auto' : '0')};
  transform: scaleY(${p => (p.isMenuShow ? '1' : '0.8')}) translateY(${p => (p.isMenuShow ? '0' : '-10px')});
  //overflow-y: auto;
  z-index: 1;
`

interface IQuartersMenu extends IQuartersItem {
  isMenuShow?: boolean
}

export const QuartersMenu: FC<IQuartersMenu> = props => {
  const { quarterData, quarterFilter } = useAppSelector(state => state.projects)

  const dispatch = useAppDispatch()

  const handleMenuItemClick = quarter => {
    dispatch(setQuarterFilter({ ...quarterFilter, quarter: quarter }))
  }

  const content = quarterData.map(quarterItem => (
    <div key={quarterItem.quarter}>
      <QuartersItem
        quarter={props.isMenubarExpanded ? quarterItem.quarter : quarterItem.quarter.slice(2, 6)}
        count={quarterItem.count}
        isMenubarExpanded={props.isMenubarExpanded}
        isSelected={quarterFilter.quarter === quarterItem.quarter}
        onClick={() => handleMenuItemClick(quarterItem.quarter)}
      />
    </div>
  ))
  return <Container {...props}>{content}</Container>
}
