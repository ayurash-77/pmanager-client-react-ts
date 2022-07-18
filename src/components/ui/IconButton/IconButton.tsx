import cn from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { IVariant } from '../ui.types'
import s from './IconButton.module.scss'

interface IIconButton extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  ml?: number
  mr?: number
  mt?: number
  size?: number
  variant?: IVariant
  disabled?: boolean
  icon: JSX.Element
}

export const IconButton: FC<IIconButton> = props => {
  const { icon, variant, disabled, size = 16, ml = 0, mr = 0, mt = 0, ...rest } = props
  return (
    <div
      className={cn(s.container, s[variant], disabled && s.disabled)}
      style={{ width: size, height: size, marginLeft: ml, marginRight: mr, marginTop: mt }}
      {...rest}
    >
      {icon}
    </div>
  )
}
