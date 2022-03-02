import React, { DetailedHTMLProps, SelectHTMLAttributes } from 'react'
import { IVariant } from './IVariant'
import { useTranslate } from '../../hooks/useTranslate'

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
  const { text } = useTranslate()
  const placeholder = props.placeholder || text.actions.select
  const optionsJsx = props.options?.map((item, idx) => (
    <option key={idx} value={item.value} label={item.label} />
  ))

  return (
    <>
      {label && <label className={variant}>{label}:</label>}
      <select className={variant} onChange={props.onChange} autoFocus={props.autoFocus} value={props.value}>
        <option value={0} label={placeholder} />
        {optionsJsx}
      </select>
    </>
  )
}
