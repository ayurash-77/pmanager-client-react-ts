import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { IVariant } from './IVariant'
import styled from 'styled-components'

export interface IInput
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  variant?: IVariant
  label?: string
}

const TextAreaStyled = styled.textarea`
  resize: none;
  min-width: 100%;
  min-height: 40px;
`

export const Textarea = ({ variant, label, ...props }: IInput): JSX.Element => {
  return (
    <>
      {label && <label className={variant}>{label}:</label>}
      <TextAreaStyled className={variant} />
    </>
  )
}
