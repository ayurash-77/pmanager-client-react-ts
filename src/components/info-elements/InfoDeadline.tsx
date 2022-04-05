import { FC } from 'react'
import { IProject } from '../../interfaces/IProject'
import { useTranslate } from '../../hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'
import { toDateStr } from '../../tools/date-time-format'

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
