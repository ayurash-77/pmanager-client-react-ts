import { FC } from 'react'
import { IProject } from '../../interfaces/IProject'
import { useTranslate } from '../../hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'
import { toDateStr } from '../../tools/date-time-format'
import statuses from '../../constants/statuses'
import { Progressbar } from '../ui/Progressbar'

interface IInfoProgress extends Partial<IProject> {
  withValue?: boolean | null
  withLabel?: boolean | null
  width?: number
  height?: number
  m?: number
}

export const InfoProgress: FC<IInfoProgress> = ({
  progress,
  status,
  withLabel,
  withValue,
  width,
  height = 4,
  m = 2,
}) => {
  const { text } = useTranslate()
  const statusColor = status && statuses[status.code].color
  const statusColorBg = status && statuses[status.code].colorBg
  return (
    <>
      {withLabel && <InfoLabel>{text.project.progress}</InfoLabel>}
      <Progressbar
        progress={progress}
        colorFg={statusColor}
        colorBg={statusColorBg}
        withValue={withValue}
        width={width}
        height={height}
        m={m}
      />
    </>
  )
}
