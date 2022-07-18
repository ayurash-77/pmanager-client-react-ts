import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react'
import s from './Box.module.scss'

interface IBox extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  width?: number | string
  height?: number | string
  rad?: number | string
  bgColor?: string
  fgColor?: string
  children?: ReactNode
}

export const Box: FC<IBox> = props => {
  const { width = '100%', height = '100%', rad = 4, bgColor = '', fgColor = '', children } = props
  return (
    <div
      className={s.container}
      style={{
        width,
        height,
        borderRadius: rad,
        background: bgColor,
        color: fgColor,
      }}
    >
      {children}
    </div>
  )
}
