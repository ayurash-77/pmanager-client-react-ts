import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { IVariant } from './IVariant'

export interface ITextarea
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  variant?: IVariant
  label?: string
  width?: string
}

export const Input = ({ variant, label, width, ...props }: ITextarea): JSX.Element => {
  return (
    <>
      {label && <label className={variant}>{label}:</label>}
      <input className={variant} {...props} style={{ width: width }} />
    </>
  )
}
