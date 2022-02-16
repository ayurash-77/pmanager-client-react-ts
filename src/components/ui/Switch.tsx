import styled from 'styled-components'
import { FC } from 'react'
import { appColors } from '../../app/App.colors'

const height = 10
const radius = 8

const width = height * 2 - 4

const Label = styled.label`
  display: flex;
  //justify-content: flex-start;
  align-items: center;
  transition: 200ms;
  user-select: none;
  margin-left: 8px;
  color: var(--text-fg-low);
  white-space: nowrap;
  //&:after {
  //  content: ':';
  //}
  &:hover {
    color: ${appColors.text.MID};
  }
`
const Container = styled.div`
  display: flex;
  align-items: center;
  grid-column-start: 2;

  //min-height: 20px;
`

const Switcher = styled.span`
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
    background: ${appColors.switcher.bg};

    &:before {
      transition: 200ms;
      position: absolute;
      content: '';
      border-radius: 50%;
      width: ${radius}px;
      height: ${radius}px;
      left: ${(height - radius) / 2}px;
      top: ${(height - radius) / 2}px;
      background: ${appColors.switcher.fg};
    }
  }

  input:checked + .slider:before {
    transform: translateX(${width / 2 - 2}px);
    background: ${appColors.switcher.fg_checked};
  }
  input:checked + .slider {
    background: ${appColors.switcher.bg_checked};
  }
`

interface ISwitch {
  label: string
  checked: boolean
  onChange: () => void
}

export const Switch: FC<ISwitch> = props => {
  const id = `input-${Math.random()}`
  return (
    <Container>
      <Switcher>
        <input id={id} type="checkbox" onChange={props.onChange} checked={props.checked} />
        <span className="slider" onClick={props.onChange} aria-hidden="true" />
      </Switcher>
      <Label htmlFor={id}>{props.label}</Label>
    </Container>
  )
}
