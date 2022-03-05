import { toDateStr } from '../../tools/date-time-format'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'

interface IInfoDate {
  label?: string
  date: Date
  color: string
}

export const InfoDate = ({ label, date, color }: IInfoDate) => {
  const value = date ? toDateStr(date) : ' --- '
  return (
    <>
      {label && <InfoLabel>{label}</InfoLabel>}
      <InfoValue colorFg={color}>{value}</InfoValue>
    </>
  )
}
