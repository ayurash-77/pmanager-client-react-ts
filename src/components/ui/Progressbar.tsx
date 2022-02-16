import styled from 'styled-components'
import { FC } from 'react'
import { ITheme } from '../../store/reducers/ui.reducer'

interface IProgressbar {
  height?: number
  colorFg?: ({ theme }: ITheme) => string
  colorBg?: ({ theme }: ITheme) => string
  progress: number
  withValue?: boolean
}

const height = p => p.height
const progressWidth = p => (p.progress > p.height / 2 ? `${p.progress.toString()}%` : `${p.height / 2}px`)
const radius = p => p.height / 2
const colorFg = p => p.colorFg
const colorBg = p => p.colorBg

const Container = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 4px;
`

const ProgressBg = styled.div<IProgressbar>`
  width: 100%;
  height: ${height}px;
  border-radius: ${radius}px;
  margin: 2px 0;
  background: ${colorBg};
  overflow: hidden;
`

const ProgressValue = styled.span<IProgressbar>`
  color: ${p => p.colorFg};
  font-size: var(--fs-small2);
`

const Progress = styled.div<IProgressbar>`
  width: ${progressWidth};
  height: 100%;
  background: ${colorFg};
`

export const Progressbar: FC<IProgressbar> = ({ height = 3, ...props }) => {
  return (
    <Container>
      <ProgressBg {...props} height={height}>
        <Progress {...props} height={height} />
      </ProgressBg>
      {props.withValue && <ProgressValue {...props}>{`${props.progress.toString()}%`}</ProgressValue>}
    </Container>
  )
}
