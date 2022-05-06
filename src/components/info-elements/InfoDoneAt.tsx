import { FC } from 'react'
import { IProject } from '../../interfaces/IProject'
import { useTranslate } from '../../hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'
import { toDateStr } from '../../utils/date-time-format'

export const InfoDoneAt: FC<Partial<IProject>> = ({ doneAt }) => {
  const { text } = useTranslate()
  const value = doneAt ? toDateStr(doneAt) : ' --- '
  return (
    <>
      <InfoLabel>{text.common.doneAt}</InfoLabel>
      <InfoValue colorFg={'var(--status-done)'}>{value}</InfoValue>
    </>
  )
}
