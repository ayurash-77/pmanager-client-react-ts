import React, { DetailedHTMLProps, SelectHTMLAttributes } from 'react'
import { IVariant } from './IVariant'

interface IOption {
  label: string
  value: number | string
}

interface IInput extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: IOption[]
  variant?: IVariant
  label?: string
}

export const Select = ({ variant, label, ...props }: IInput): JSX.Element => {
  const optionsJsx = props.options.map((item, id) => (
    <option key={id} value={item.value} label={item.label} />
  ))

  return (
    <>
      {label && <label className={variant}>{label}:</label>}
      <select className={variant} onChange={props.onChange} autoFocus={props.autoFocus} value={props.value}>
        {optionsJsx}
      </select>
    </>
  )
}
