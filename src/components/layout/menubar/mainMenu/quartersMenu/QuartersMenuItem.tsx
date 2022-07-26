import cn from 'classnames'
import { FC } from 'react'
import css from './QuartersMenuItem.module.scss'
import { IQuartersMenuItem } from './quartersMenuItem.interfaces'

export const QuartersMenuItem: FC<IQuartersMenuItem> = props => {
  const { menubarExpanded, isSelected, quarter, count, ...rest } = props
  return (
    <div className={cn(css.container, isSelected && css.selected, menubarExpanded && css.expanded)} {...rest}>
      <div className={cn(css.text, menubarExpanded && css.expanded)}>{quarter}</div>
      <div className={cn(css.count, menubarExpanded && css.expanded)}>{count}</div>
    </div>
  )
}
