import styled from 'styled-components'
import cn from 'classnames'
import { IVariant } from './IVariant'

interface IIconButtonStyled {
  ml?: number
  mr?: number
  mt?: number
  size?: number
  opacity?: number
  variant?: IVariant
  disabled?: boolean
}

interface IIconButton extends IIconButtonStyled {
  icon: JSX.Element
  onClick?: (e?) => void | Promise<void>
}

const marginLeft = p => (p.ml ? p.ml.toString() + 'px' : 0)
const marginRight = p => (p.mr ? p.mr.toString() + 'px' : 0)
const marginTop = p => (p.mt ? p.mt.toString() + 'px' : 0)
const size = p => p.size && p.size.toString() + 'px'
const opacity = p => p.opacity || 0.8

const IconButtonStyled = styled.div<IIconButtonStyled>`
  width: ${size};
  height: ${size};
  transition: opacity 100ms;
  margin-left: ${marginLeft};
  margin-right: ${marginRight};
  margin-top: ${marginTop};
  display: flex;
  align-items: center;
  opacity: ${opacity};

  &.primary {
    color: var(--button-bg-primary);
  }
  &.secondary {
    color: var(--text-low);
    opacity: 0.6;
  }
  &.accent {
    color: var(--accent);
  }
  &.warning {
    color: var(--warning);
  }

  &:hover {
    opacity: 1;
  }

  &.disabled {
    opacity: 0.4;
  }
`

export const IconButton = ({ icon, variant, disabled, size = 16, ...props }: IIconButton): JSX.Element => {
  return (
    <IconButtonStyled className={cn(variant, { disabled: disabled })} size={size} {...props}>
      {icon}
    </IconButtonStyled>
  )
}
