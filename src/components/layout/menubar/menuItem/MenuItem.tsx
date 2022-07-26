import cn from 'classnames'
import { FC } from 'react'
import css from './MenuItem.module.scss'
import { IMenuItem } from './menuItem.interfaces'

export const MenuItem: FC<IMenuItem> = props => {
  const { isSelected, menubarExpanded, icon, name, count, ...rest } = props
  return (
    <div className={cn(css.container, isSelected && css.selected, menubarExpanded && css.expanded)} {...rest}>
      <div className={css.icon}>{icon}</div>
      <div className={cn(css.text, menubarExpanded && css.expanded)}>{name}</div>
      <div className={cn(css.count, menubarExpanded && css.expanded)}>{count}</div>
    </div>
  )
}
