import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import styled, { css } from 'styled-components'
import { appColors } from '../../app/App.colors'
import { IVariant } from './IVariant'

interface IPmButton
  extends Partial<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> {
  margin?: string
  variant?: IVariant
}

const PmButtonBody: FC<IPmButton> = ({ children, variant = 'normal', ...props }) => {
  return <button {...props}>{children}</button>
}

const margin = p => p?.margin

const colorsVariant = (p: IPmButton) => {
  switch (p.variant) {
    case 'important':
      return css`
        color: ${appColors.main.ACCENT_FG};
        background: ${appColors.main.ACCENT_BG};
        border: 1px solid ${appColors.main.ACCENT_BG};
        &:hover {
          color: ${appColors.palette.WHITE80};
          border: 1px solid ${appColors.main.ACCENT_BORDER_HOVER};
        }
        &:focus {
          color: ${appColors.palette.WHITE80};
          border: 1px solid ${appColors.main.ACCENT_BORDER_FOCUS};
          box-shadow: 0 0 8px ${appColors.main.ACCENT_BORDER_FOCUS};
        }
      `
    case 'warning':
      return css`
        color: ${appColors.main.WARNING_FG};
        background: ${appColors.main.WARNING_BG};
        border: 1px solid ${appColors.main.WARNING_BG};
        &:hover {
          color: ${appColors.palette.WHITE90};
          border: 1px solid ${appColors.main.WARNING_BORDER_HOVER};
        }
        &:focus {
          color: ${appColors.palette.WHITE90};
          border: 1px solid ${appColors.main.WARNING_BORDER_FOCUS};
          box-shadow: 0 0 8px ${appColors.main.WARNING_BORDER_FOCUS};
        }
      `
    default:
      return css`
        color: ${appColors.buttons.FG};
        background: ${appColors.buttons.BG};
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

export const Button = styled(PmButtonBody)<IPmButton>`
  transition: all 150ms;
  margin: ${margin};
  text-transform: uppercase;
  font-size: 12px;
  font-family: var(--ff-btn);
  height: 22px;
  min-width: 32px;
  outline: none;
  border-radius: 4px;
  padding: 0 8px;
  box-shadow: 0 1px 3px ${appColors.buttons.SHADOW};
  ${colorsVariant}

  &:active {
    color: ${appColors.buttons.FG_PRESSED};
    background: ${appColors.buttons.BG_PRESSED};
  }
`
