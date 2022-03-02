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
}

export const InfoProgress: FC<IInfoProgress> = ({ progress, status, withValue }) => {
  const { text } = useTranslate()
  const statusColor = statuses[status.code].color
  const statusColorBg = statuses[status.code].colorBg
  return (
    <>
      {withValue && <InfoLabel>{text.project.progress}</InfoLabel>}
      <Progressbar progress={progress} colorFg={statusColor} colorBg={statusColorBg} withValue={withValue} />
    </>
  )
}
