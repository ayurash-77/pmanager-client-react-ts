import { FC } from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
import { toDateStr } from '../../utils/date-time-format'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'

export const InfoStartAt: FC<Partial<IProject>> = ({ startAt }) => {
  const { text } = useTranslate()
  const value = startAt ? toDateStr(startAt) : ' --- '
  return (
    <>
      <InfoLabel>{text.common.startAt}</InfoLabel>
      <InfoValue colorFg={'var(--date1)'}>{value}</InfoValue>
    </>
  )
}
