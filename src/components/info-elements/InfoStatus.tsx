import { FC } from 'react'
import { IProject } from '../../interfaces/IProject'
import { useTranslate } from '../../hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'
import { toDateStr } from '../../tools/date-time-format'
import statuses from '../../constants/statuses'

export const InfoStatus: FC<Partial<IProject>> = ({ status }) => {
  const { text } = useTranslate()
  const color = status ? statuses[status.code].color : 'var(--main-fg)'
  const value = status?.name
  return (
    <>
      <InfoLabel>{text.project.status}</InfoLabel>
      <InfoValue colorFg={color} selected={false}>
        {value}
      </InfoValue>
    </>
  )
}
