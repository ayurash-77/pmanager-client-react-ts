import styled from 'styled-components'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'

const marginLeft = p => (p.rounded === 'left' || p.rounded === 'all' ? '9px' : '1px')
const marginRight = p => (p.marginRight ? '9px' : '0')

interface IToolButton {
  rounded: string
  selected: boolean
  marginRight?: string
}

const ToolButtonStyled = styled.div<IToolButton>`
  transition: all 150ms;
  height: 22px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-left: ${marginLeft};
  margin-right: ${marginRight};
  cursor: default;
  ${r => (r.rounded === 'left' ? 'border-radius: 4px 0 0 4px' : '')};
  ${r => (r.rounded === 'right' ? 'border-radius: 0 4px 4px 0' : '')};
  ${r => (r.rounded === 'none' ? 'border-radius: 0' : '')};
  color: ${p => (p.selected ? 'var(--btn-fg-selected)' : 'var(--btn-fg-normal)')};
  background: ${p => (p.selected ? 'var(--btn-bg-selected)' : 'var(--btn-bg-normal)')};

  &:hover {
    ${p => (p.selected ? '' : 'color: var(--btn-fg-hover);')}
  }

  &:active {
    ${p => (p.selected ? '' : 'color: var(--btn-fg-pressed);')}
    ${p => (p.selected ? '' : 'background: var(--btn-bg-pressed);')}
  }
`

export const ToolButton = (props: {
  icon: any
  selected: any
  rounded: any
  action: any
  marginRight?: any
}) => {
  const { icon, selected, rounded, action, marginRight } = props
  const ToolbarIcon = ToolbarIcons[icon]
  return (
    <ToolButtonStyled selected={selected} rounded={rounded} onClick={action} marginRight={marginRight}>
      <ToolbarIcon />
    </ToolButtonStyled>
  )
}
