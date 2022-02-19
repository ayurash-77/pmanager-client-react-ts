import React, { FC } from 'react'

import styled from 'styled-components'
import Loader from './Loader'

interface Prop {
  size: number
}

interface IWaiting extends Prop {
  isShow: boolean
}

const Wrap = styled.div`
  width: 200px;
  height: 200px;
  margin: auto auto;
  overflow: hidden;
  background: none;
`

const Waiting: FC<IWaiting> = ({ ...props }) => (
  <Wrap>
    <Loader size={64} />
  </Wrap>
)

export default Waiting
