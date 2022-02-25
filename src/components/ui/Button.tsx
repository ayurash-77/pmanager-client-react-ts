import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import { IVariant } from './IVariant'

interface IButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode
  variant?: IVariant
}

export const Button = ({ children, variant, ...props }: IButton): JSX.Element => {
  return (
    <button className={variant} {...props}>
      {children}
    </button>
  )
}
