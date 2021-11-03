import { FC } from 'react'

const margin = p => p.margin || 0
const marginTop = p => p.marginTop || 0
const marginBottom = p => p.marginBottom || 0

interface IButton {
  type: 'button' | 'reset' | 'submit'
  margin?: string
  marginTop?: string
  marginBottom?: string

  onClick?: () => void
}

export const Button: FC<IButton> = ({
  children,
  onClick,
  type = 'button',
  margin,
  marginTop,
  marginBottom,
}) => (
  <>
    <button type={type} onClick={onClick} style={{ margin }}>
      {children}
    </button>
  </>
)
