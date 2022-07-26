import cn from 'classnames'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux'
import { setQuarterFilter } from '../../../../../store/reducers/projects.reducer'
import css from './QuartersMenu.module.scss'
import { QuartersMenuItem } from './QuartersMenuItem'
import { IQuartersMenu } from './quartersMenu.interfaces'

export const QuartersMenu: FC<IQuartersMenu> = props => {
  const { isMenuShow } = props
  const { expanded: menubarExpanded } = useAppSelector(state => state.ui.menubar)
  const { quarterData, quarterFilter } = useAppSelector(state => state.projects)

  const dispatch = useAppDispatch()

  const handleMenuItemClick = quarter => {
    dispatch(setQuarterFilter({ ...quarterFilter, quarter: quarter }))
  }

  const content = quarterData.map(quarterItem => (
    <div key={quarterItem.quarter}>
      <QuartersMenuItem
        quarter={menubarExpanded ? quarterItem.quarter : quarterItem.quarter.slice(2, 6)}
        count={quarterItem.count}
        menubarExpanded={menubarExpanded}
        isSelected={quarterFilter.quarter === quarterItem.quarter}
        onClick={() => handleMenuItemClick(quarterItem.quarter)}
      />
    </div>
  ))
  return <div className={cn(css.container, !isMenuShow && css.hide)}>{content}</div>
}
