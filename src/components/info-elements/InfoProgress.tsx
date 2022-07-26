import { FC } from 'react'
import statuses from '../../constants/statuses'
import { IProject } from '../../entities/projects/projects.interfaces'
import { useTranslate } from '../../hooks/useTranslate'
import { Progressbar } from '../ui'
import { InfoLabel } from './InfoLabel'

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
      {withLabel && <InfoLabel>{text.common.progress}</InfoLabel>}
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
