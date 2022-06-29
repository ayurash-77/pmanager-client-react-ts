import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import { IVariant } from './IVariant'

export interface ITextarea
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  variant?: IVariant
  label?: string
  width?: string | number
}

export const Input: FC<ITextarea> = props => {
  const { variant, label, width, ...rest } = props
  return (
    <>
      {label && <label className={variant}>{label}:</label>}
      <input className={variant} {...rest} style={{ width: width }} />
      {/* <input className={variant} {...rest} /> */}
    </>
  )
}
