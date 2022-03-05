import { IVariant } from './IVariant'
import styled from 'styled-components'
import cn from 'classnames'

interface ITextAreaStyled {
  width?: string
  height?: string
}

const width = p => p.width || '100%'
const height = p => p.height || '40px'

const TextAreaStyled = styled.div<ITextAreaStyled>`
  display: flex;
  align-items: center;
  width: ${width};
  height: ${height};

  textarea {
    width: ${width};
    height: ${height};
  }
`

export interface ITextArea extends ITextAreaStyled {
  value: string
  onChange: (e) => void
  variant?: IVariant
  label?: string
}

export const Textarea = ({
  variant,
  label,
  width,
  height,
  value,
  onChange,
  ...props
}: ITextArea): JSX.Element => {
  return (
    <>
      {label && <label className={variant}>{label}:</label>}
      <TextAreaStyled width={width} height={height}>
        <textarea className={cn(variant)} value={value} onChange={onChange} {...props} />
      </TextAreaStyled>
    </>
  )
}
