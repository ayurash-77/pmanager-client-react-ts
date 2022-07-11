import styled from 'styled-components'
import cn from 'classnames'

interface IToolButtonStyled {
  ml?: number
  mr?: number
  disabled?: boolean
  selected?: boolean
}

interface IIconButton extends IToolButtonStyled {
  icon: JSX.Element
  onClick?: () => void
}

const marginLeft = p => p.ml && p.ml.toString() + 'px'
const marginRight = p => p.mr && p.mr.toString() + 'px'

const ToolButtonStyled = styled.div<IToolButtonStyled>`
  margin-left: ${marginLeft};
  margin-right: ${marginRight};
  transition: opacity 100ms;
  cursor: default;
  height: 22px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--button-fg);
  background: var(--button-bg);
  &:hover {
    opacity: 1;
  }
  &.selected {
    color: var(--button-fg-selected);
    background: var(--button-bg-selected);
  }
  &.disabled {
    opacity: 0.25;
  }
`

export const ToolButton = ({ icon, disabled, selected, ...props }: IIconButton): JSX.Element => {
  return (
    <ToolButtonStyled className={cn({ disabled: disabled, selected: selected })} {...props}>
      {icon}
    </ToolButtonStyled>
  )
}
