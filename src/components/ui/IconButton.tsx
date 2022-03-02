import styled from 'styled-components'
import cn from 'classnames'
import { IVariant } from './IVariant'

interface IIconButtonStyled {
  ml?: number
  mr?: number
  size?: number
  variant?: IVariant
  disabled?: boolean
}

interface IIconButton extends IIconButtonStyled {
  icon: JSX.Element
  onClick?: () => void
}

const marginLeft = p => (p.ml ? p.ml.toString() + 'px' : 0)
const marginRight = p => (p.mr ? p.mr.toString() + 'px' : 0)
const size = p => p.size && p.size.toString() + 'px'

const IconButtonStyled = styled.div<IIconButtonStyled>`
  width: ${size};
  height: ${size};
  transition: opacity 100ms;
  margin-left: ${marginLeft};
  margin-right: ${marginRight};
  display: flex;
  align-items: center;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
  &.accent {
    color: var(--accent);
  }
  &.warning {
    color: var(--warning);
  }
  &.disabled {
    opacity: 0.4;
  }
`

export const IconButton = ({ icon, variant, disabled, ...props }: IIconButton): JSX.Element => {
  return (
    <IconButtonStyled className={cn(variant, { disabled: disabled })} {...props}>
      {icon}
    </IconButtonStyled>
  )
}
