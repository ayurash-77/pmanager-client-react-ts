import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { IVariant } from './IVariant'

export interface IInput extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  variant?: IVariant
  label?: string
}

export const Input = ({ variant, label, ...props }: IInput): JSX.Element => {
  return (
    <>
      {label && <label className={variant}>{label}:</label>}
      <input className={variant} {...props} />
    </>
  )
}
