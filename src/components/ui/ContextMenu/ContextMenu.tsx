import cn from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react'
import css from './ContextMenu.module.scss'
import { ContextMenuItem, IContextMenuItem } from './ContextMenuItem'

interface IContextMenu extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: IContextMenuItem[]
  show: boolean
  position: number[]
}
export const ContextMenu: FC<IContextMenu> = props => {
  const { data, show, position = [0, 0] } = props
  const [x, setX] = useState(0)

  const menuRef = useRef(null)

  useEffect(() => {
    if (menuRef.current) {
      const maxX = window.outerWidth - menuRef.current.offsetWidth - 25
      position[0] > maxX ? setX(maxX) : setX(position[0])
    }
  }, [position, setX])

  const left = `${x}px`
  const top = `${position[1]}px`

  return (
    <>
      <div className={cn(css.container, !show && css.hide)} style={{ top, left }} ref={menuRef}>
        {data.map(item => (
          <ContextMenuItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            entityType={item.entityType}
            variant={item.variant}
            shortcut={item.shortcut}
            action={item.action}
          />
        ))}
      </div>
    </>
  )
}
