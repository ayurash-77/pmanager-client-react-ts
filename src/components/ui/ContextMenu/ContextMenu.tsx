import cn from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react'
import css from './ContextMenu.module.scss'

interface IContextMenu extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode
  show: boolean
  position: number[]
}
export const ContextMenu: FC<IContextMenu> = props => {
  const { children, show, position = [0, 0] } = props
  const left = `${position[0]}px`
  const top = `${position[1]}px`

  return (
    <>
      <div className={cn(css.container, !show && css.hide)} style={{ top, left }}>
        {children}
      </div>
    </>
  )
}
