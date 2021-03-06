import { toDateStr, toTimeStr } from '../../tools/date-time-format'
import { InfoLabel } from './InfoLabel'
import styled from 'styled-components'

const DateTimeContainer = styled.div`
  display: flex;
  gap: 4px;
  .date {
    color: var(--date1);
  }
  .time {
    color: var(--time1);
  }
`

interface IInfoDateTime {
  label?: string
  dateTime: Date
}

export const InfoDateTime = ({ label, dateTime }: IInfoDateTime) => {
  return (
    <>
      {label && <InfoLabel>{label}</InfoLabel>}
      <DateTimeContainer>
        <div className={'date'}>{toDateStr(dateTime)}</div>
        <div className={'time'}>{toTimeStr(dateTime)}</div>
      </DateTimeContainer>
    </>
  )
}
