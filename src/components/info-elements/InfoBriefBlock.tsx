import { FC } from 'react'
import { IBrief } from '../../interfaces/IBrief'
import { useTranslate } from '../../hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'
import { toDateStr } from '../../tools/date-time-format'
import { InfoProjectTitleContainer } from './InfoProjectTitle'
import { InfoGrid } from './InfoGrid'

export const InfoBriefBlock: FC<Partial<IBrief>> = brief => {
  const { text } = useTranslate()

  const approved = brief.approved ? text.brief.approved : text.brief.notApproved
  const statusColor = brief.approved ? 'var(--status-completed)' : 'var(--status-approving)'

  return (
    <>
      <InfoProjectTitleContainer>{brief.name}</InfoProjectTitleContainer>
      <InfoGrid>
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
      </InfoGrid>
    </>
  )
}
