import { FC } from 'react'
import { IProject } from '../../interfaces/IProject'
import { useTranslate } from '../../hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'
import { toDateStr } from '../../tools/date-time-format'

export const InfoStartAt: FC<Partial<IProject>> = ({ startAt }) => {
  const { text } = useTranslate()
  const value = startAt ? toDateStr(startAt) : ' --- '
  return (
    <>
      <InfoLabel>{text.project.startAt}</InfoLabel>
      <InfoValue colorFg={'var(--date1)'}>{value}</InfoValue>
    </>
  )
}
