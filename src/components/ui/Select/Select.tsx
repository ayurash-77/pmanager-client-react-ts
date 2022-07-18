import React, { DetailedHTMLProps, FC, SelectHTMLAttributes } from 'react'
import { useTranslate } from '../../../hooks/useTranslate'
import { IVariant } from '../ui.types'

export interface IOption {
  label: string
  value: number | string
}

interface IInput extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: IOption[]
  placeholder?: string
  variant?: IVariant
  label?: string
  width?: string
}

export const Select: FC<IInput> = props => {
  const { variant, label, width = '100%', options, placeholder, ...rest } = props
  const { text } = useTranslate()

  const optionsJsx = options?.map((item, idx) => <option key={idx} value={item.value} label={item.label} />)

  return (
    <>
      {label && <label className={variant}>{label}:</label>}
      <select
        className={variant}
        onChange={rest.onChange}
        autoFocus={rest.autoFocus}
        value={rest.value}
        style={{ width: width }}
      >
        <option value={0} label={placeholder || text.actions.select} />
        {optionsJsx}
      </select>
    </>
  )
}
