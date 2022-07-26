import { FC } from 'react'
import { IProject } from '../../entities/projects/projects.interfaces'
import { useTranslate } from '../../hooks/useTranslate'
import { toDateStr } from '../../utils/date-time-format'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'

export const InfoCreatedAt: FC<Partial<IProject>> = ({ createdAt }) => {
  const { text } = useTranslate()
  const value = createdAt ? toDateStr(createdAt) : ' --- '
  return (
    <>
      <InfoLabel>{text.common.createdAt}</InfoLabel>
      <InfoValue colorFg={'var(--date1)'}>{value}</InfoValue>
    </>
  )
}
