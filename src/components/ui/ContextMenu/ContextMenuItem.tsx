import cn from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { IEntityType } from 'components/ui/ui.types'
import { IVariant } from '../ui.types'
import css from './ContextMenu.module.scss'

export interface IContextMenuItem extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon?: JSX.Element
  title?: string
  shortcut?: string
  entityType?: IEntityType
  variant?: IVariant
  disabled?: boolean
  action: () => void
}

export const ContextMenuItem: FC<IContextMenuItem> = props => {
  const { icon, title, shortcut, entityType = 'shot', variant, disabled, action } = props
  return (
    <div className={cn(css.itemContainer)} onClick={action}>
      <div className={cn(css.item, css[variant], disabled && css.disabled)}>
        <div className={cn(css.icon, css[entityType], css[variant], disabled && css.disabled)}>{icon}</div>
        <div className={cn(css.title, disabled && css.disabled)}>{title}</div>
        <div className={cn(css.shortcut, disabled && css.disabled)}>{shortcut}</div>
      </div>
    </div>
  )
}
