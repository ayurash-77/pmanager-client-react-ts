import React, { FC } from 'react'

import styled from 'styled-components'

const size = props => props.size
const border = props => props.border

interface Prop {
  size: number
}

interface ILoader extends Prop {
  size: number
  border?: number
  translateX?: number
}

const Wrap = styled.div<ILoader>`
  width: ${size}px;
  height: ${size}px;
  margin-right: -${p => p.translateX}px;
  overflow: hidden;
  background: none;
`

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.5);
  backface-visibility: hidden;
  transform-origin: 0 0;
`

const SpinnerDiv = styled.div<ILoader>`
  position: absolute;
  width: ${size}px;
  height: ${size}px;
  border: ${border}px solid #636f7c;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spinner 1s linear infinite;
  top: ${size}px;
  left: ${size}px;
  box-sizing: content-box;
  @keyframes spinner {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`

const Loader: FC<ILoader> = ({ size = 32, border = 4, translateX = 0 }) => (
  <Wrap size={size} translateX={translateX}>
    <Spinner className="spinner">
      <SpinnerDiv size={size} border={border} />
    </Spinner>
  </Wrap>
)

export default Loader
