import { FC } from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
import { toDateStr } from '../../utils/date-time-format'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'

export const InfoDeadline: FC<Partial<IProject>> = ({ deadline }) => {
  const { text } = useTranslate()
  const value = deadline ? toDateStr(deadline) : ' --- '
  return (
    <>
      <InfoLabel>{text.common.deadline}</InfoLabel>
      <InfoValue colorFg={'var(--accent)'}>{value}</InfoValue>
    </>
  )
}
