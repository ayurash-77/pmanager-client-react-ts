import styled, { css } from 'styled-components'
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import { appColors } from '../../app/App.colors'
import { IVariant } from './IVariant'

interface IInput extends Partial<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> {
  variant?: IVariant
  label?: string
}

const InputBody: FC<IInput> = ({ children, label, variant = 'normal', ...props }) => {
  return (
    <>
      {label && <Label label={label}>{label}</Label>}
      <input {...props} />
    </>
  )
}

const Label = styled.label<IInput>`
  color: ${p => (p.variant === 'important' ? appColors.main.ACCENT_FG : appColors.text.MID)};
  font-size: var(--fs-normal);
  white-space: nowrap;
  user-select: none;
  &:after {
    content: '${p => (p.label ? ': ' : '')}';
  }
`

const colorsVariant = (p: IInput) => {
  switch (p.variant) {
    case 'important':
      return css`
        border: 1px solid ${appColors.main.ACCENT_BG};
        &:hover {
          border: 1px solid ${appColors.main.ACCENT_BORDER_HOVER};
        }
        &:focus {
          border: 1px solid ${appColors.main.ACCENT_BORDER_FOCUS};
          box-shadow: 0 0 8px ${appColors.main.ACCENT_BORDER_FOCUS};
        }
      `
    case 'warning':
      return css`
        border: 1px solid ${appColors.main.WARNING_BG};
        &:hover {
          border: 1px solid ${appColors.main.WARNING_BORDER_HOVER};
        }
        &:focus {
          border: 1px solid ${appColors.main.WARNING_BORDER_FOCUS};
          box-shadow: 0 0 8px ${appColors.main.WARNING_BORDER_FOCUS};
        }
      `
    default:
      return css`
        color: ${appColors.buttons.FG};
        border: 1px solid ${appColors.buttons.BG};
        &:hover {
          color: ${appColors.buttons.FG_HOVER};
          border: 1px solid ${appColors.buttons.BORDER_HOVER};
        }
        &:focus {
          color: ${appColors.text.HIGH};
          border: 1px solid ${appColors.main.BORDER_FOCUS};
          box-shadow: 0 0 8px ${appColors.main.BORDER_FOCUS};
        }
      `
  }
}

export const Input = styled(InputBody)`
  margin-top: 1px;
  margin-bottom: 1px;
  transition: all 150ms;
  ${colorsVariant};
`
