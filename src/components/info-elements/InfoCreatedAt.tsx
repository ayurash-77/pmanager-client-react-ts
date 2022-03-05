import { FC } from 'react'
import { IProject } from '../../interfaces/IProject'
import { useTranslate } from '../../hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'
import { toDateStr } from '../../tools/date-time-format'

export const InfoCreatedAt: FC<Partial<IProject>> = ({ createdAt }) => {
  const { text } = useTranslate()
  const value = createdAt ? toDateStr(createdAt) : ' --- '
  return (
    <>
      <InfoLabel>{text.project.createdAt}</InfoLabel>
      <InfoValue colorFg={'var(--date1)'}>{value}</InfoValue>
    </>
  )
}
