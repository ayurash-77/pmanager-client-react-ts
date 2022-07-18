import { FC } from 'react'
import styled from 'styled-components'

interface IProgressbar {
  height?: number
  width?: number
  m?: number
  colorFg?: string
  colorBg?: string
  progress: number
  withValue?: boolean
}

const height = p => p.height
const width = p => (p.width ? p.width + 'px' : '100%')
const margin = p => p.m + 'px 0'
const progressWidth = p => (p.progress > p.height / 2 ? p.progress : p.height / 2)
const radius = p => p.height / 2
const colorFg = p => p.colorFg
const colorBg = p => p.colorBg

const Container = styled.div<IProgressbar>`
  display: flex;
  align-items: center;
  grid-gap: 4px;
  min-width: ${width};
`

const ProgressBg = styled.div<IProgressbar>`
  width: ${width};
  height: ${height}px;
  border-radius: ${radius}px;
  margin: ${margin};
  background: ${colorBg};
  overflow: hidden;
`

const ProgressValue = styled.span<IProgressbar>`
  color: ${p => p.colorFg};
  font-size: var(--fs-small2);
`

const Progress = styled.div<IProgressbar>`
  width: ${progressWidth}%;
  height: 100%;
  background: ${colorFg};
`

export const Progressbar: FC<IProgressbar> = ({ height = 3, ...props }) => {
  return (
    <Container {...props}>
      <ProgressBg {...props} height={height}>
        <Progress {...props} height={height} />
      </ProgressBg>
      {props.withValue && <ProgressValue {...props}>{props.progress}%</ProgressValue>}
    </Container>
  )
}
