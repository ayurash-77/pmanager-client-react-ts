import { FC } from 'react'

interface IButton {
  type: 'button' | 'reset' | 'submit'
  margin?: string
  marginTop?: string
  marginBottom?: string
  onClick?: () => void
}

export const Button: FC<IButton> = ({ children, onClick, type = 'button', margin = 0 }) => (
  <button type={type} onClick={onClick} style={{ margin }}>
    {children}
  </button>
)
