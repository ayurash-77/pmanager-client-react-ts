import styled from 'styled-components'
import { FC } from 'react'
import cn from 'classnames'

const height = 10
const radius = 8

const width = height * 2 - 4

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  grid-column-start: 2;

  label {
    transition: position 200ms;
    user-select: none;
    color: var(--text-low);
    white-space: nowrap;
    &:hover {
      color: var(--text-mid);
    }
    &.checked {
      color: var(--text-mid);
      &:hover {
        color: var(--text-high);
      }
    }
  }

  .switcher {
    position: relative;
    display: inline-block;
    width: ${width}px;
    height: ${height}px;
    margin-right: 6px;

    input {
      width: 0;
      height: 0;
      opacity: 0;
    }

    .slider {
      transition: 200ms;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border-radius: ${height / 2}px;
      background: var(--switcher-bg);

      &:before {
        transition: 200ms;
        position: absolute;
        content: '';
        border-radius: 50%;
        width: ${radius}px;
        height: ${radius}px;
        left: ${(height - radius) / 2}px;
        top: ${(height - radius) / 2}px;
        background: var(--switcher-fg);
      }
    }

    input:checked + .slider:before {
      transform: translateX(${width / 2 - 2}px);
      background: var(--switcher-fg-checked);
    }
    input:checked + .slider {
      background: var(--switcher-bg-checked);
    }
  }
`

interface ISwitcher {
  label?: string
  checked: boolean
  onChange: () => void
}

export const Switcher: FC<ISwitcher> = props => {
  const id = `input-${Math.random()}`
  return (
    <SwitcherContainer>
      <div className={'switcher'}>
        <input id={id} type="checkbox" onChange={props.onChange} checked={props.checked} />
        <span className="slider" onClick={props.onChange} aria-hidden="true" />
      </div>
      <label htmlFor={id} className={cn({ checked: props.checked })}>
        {props.label}
      </label>
    </SwitcherContainer>
  )
}
