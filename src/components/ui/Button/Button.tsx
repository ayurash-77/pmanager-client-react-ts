import cn from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'
import { IVariant } from '../ui.types'
import css from './Button.module.scss'

interface IButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode
  variant?: IVariant
  width?: string
}

export const Button: FC<IButton> = props => {
  const { children, variant = 'normal', width, ...rest } = props
  return (
    <button className={cn(css.main, variant)} style={{ width: width }} {...rest}>
      {children}
    </button>
  )
}
