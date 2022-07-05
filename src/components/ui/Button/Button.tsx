import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import { IVariant } from '../IVariant'

interface IButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode
  variant?: IVariant
  width?: string
}

export const Button = ({ children, variant, width, ...props }: IButton): JSX.Element => {
  return (
    <button className={variant} style={{ width: width }} {...props}>
      {children}
    </button>
  )
}
