import { FC } from 'react'
import { IProject } from '../../entities/projects/projects.interfaces'
import { useTranslate } from '../../hooks/useTranslate'
import { toDateStr } from '../../utils/date-time-format'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'

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
