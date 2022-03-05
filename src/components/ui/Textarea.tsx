import { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { IVariant } from './IVariant'
import styled from 'styled-components'
import cn from 'classnames'

export interface IInput
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  variant?: IVariant
  label?: string
  width?: string
  height?: string
}

export const Textarea = ({ variant, label, width, height, ...props }: IInput): JSX.Element => {
  return (
    <>
      {label && <label className={variant}>{label}:</label>}
      <textarea className={cn(variant)} {...props} style={{ width: width, height: height }} />
    </>
  )
}
