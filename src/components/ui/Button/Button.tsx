import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'
import { IVariant } from '../ui.types'

interface IButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode
  variant?: IVariant
  width?: string
}

export const Button: FC<IButton> = props => {
  const { children, variant, width, ...rest } = props
  return (
    <button className={variant} style={{ width: width }} {...rest}>
      {children}
    </button>
  )
}
