import { FC } from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import { IBrief } from '../../interfaces/IBrief'
import { toDateStr } from '../../utils/date-time-format'
import { InfoLabel } from './InfoLabel'
import { InfoProjectTitleContainer } from './InfoProjectTitle'
import { InfoValue } from './InfoValue'

export const InfoBriefBlock: FC<Partial<IBrief>> = brief => {
  const { text } = useTranslate()

  const approved = brief.approved ? text.brief.approved : text.brief.notApproved
  const statusColor = brief.approved ? 'var(--status-completed)' : 'var(--status-approving)'

  return (
    <>
      <InfoProjectTitleContainer>{brief.name}</InfoProjectTitleContainer>
      <div className={'grid info'}>
        <InfoLabel>{text.brief.name}</InfoLabel>
        <InfoValue>{brief.name}</InfoValue>
        <InfoLabel>{text.brief.originalMame}</InfoLabel>
        <InfoValue style={{ color: 'var(--text-high)' }}>{brief.originalName}</InfoValue>
        <InfoLabel>{text.brief.category}</InfoLabel>
        <InfoValue>{brief.category.name}</InfoValue>
        <InfoLabel>{text.brief.createdAt}</InfoLabel>
        <InfoValue>
          <span style={{ color: 'var(--date1)' }}>{toDateStr(brief.createdAt)}</span> (
          <span style={{ color: 'var(--user-email)' }}>{brief.createdBy.username}</span>)
        </InfoValue>
        <InfoLabel>{text.brief.updatedAt}</InfoLabel>
        <InfoValue>
          <span style={{ color: 'var(--date1)' }}>{toDateStr(brief.updatedAt)}</span> (
          <span style={{ color: 'var(--user-email)' }}>{brief.updatedBy.username}</span>)
        </InfoValue>
        <InfoLabel>{text.common.status}</InfoLabel>
        <InfoValue colorFg={statusColor}>{approved}</InfoValue>
      </div>
    </>
  )
}
