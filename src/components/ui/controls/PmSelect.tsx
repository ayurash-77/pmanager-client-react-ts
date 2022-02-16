import styled from 'styled-components'
// import Select from 'react-select/base'
import { DetailedHTMLProps, FC, FocusEventHandler, SelectHTMLAttributes } from 'react'
import { ActionMeta, GroupBase, InputActionMeta, PropsValue, StylesConfig } from 'react-select'
import ReactSelect from 'react-select/base'

interface ISelectOptions {
  label: string
  value: string
}

interface IPmSelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> {
  options: ISelectOptions[]
  styles?: StylesConfig<ISelectOptions, false, GroupBase<ISelectOptions>>
  value: PropsValue<ISelectOptions>
  onChange: (newValue: ISelectOptions, actionMeta: ActionMeta<ISelectOptions>) => void
  // onBlur?: FocusEventHandler<HTMLInputElement>
  // onFocus?: FocusEventHandler<HTMLInputElement>
  inputValue: string
  onInputChange: (newValue: string, actionMeta: InputActionMeta) => void
  onMenuOpen: undefined
  onMenuClose: undefined
}

export const PmSelect: FC<IPmSelectProps> = ({ ...props }) => {
  return <ReactSelect {...props} />
}
