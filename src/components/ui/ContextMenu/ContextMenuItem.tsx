import cn from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { IEntityType } from '../../../interfaces/IEntityType'
import { IVariant } from '../ui.types'
import css from './ContextMenu.module.scss'

export interface IContextMenuItem extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon?: JSX.Element
  title?: string
  shortcut?: string
  entityType?: IEntityType
  variant?: IVariant
  action: () => void
}

export const ContextMenuItem: FC<IContextMenuItem> = props => {
  const { icon, title, shortcut, entityType = 'shot', variant = 'normal', action } = props
  return (
    <div className={cn(css.item, css[variant])} onClick={action}>
      <div className={cn(css.icon, css[entityType], css[variant])}>{icon}</div>
      <div className={css.title}>{title}</div>
      <div className={css.shortcut}>{shortcut}</div>
    </div>
  )
}