import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
import { FC } from 'react'
import * as s from './InfoElements.styles'
import { toDateStr } from '../../tools/date-time-format'
import statuses from '../../constants/statuses'
import { Progressbar } from '../ui/Progressbar'
import { IBrief } from '../../interfaces/IBrief'
import { appColors } from '../../app/App.colors'

interface InfoProjectTitle extends Partial<IProject> {
  align?: 'left' | 'right' | 'center'
  margin?: number
}

export const InfoProjectTitle: FC<InfoProjectTitle> = ({ title, highPriority, align, margin, status }) => {
  // const statusColor = status ? statuses[status.code].color : null
  const statusColor = status ? statuses[status.code].color : null
  return (
    <s.InfoProjectTitleContainer align={align} margin={margin} statusColor={statusColor}>
      {highPriority && <span className="accent" />}
      {title}
    </s.InfoProjectTitleContainer>
  )
}
export const InfoBrand: FC<Partial<IProject>> = ({ brand }) => {
  const { text } = useTranslate()
  const value = brand ? brand.name : ' --- '
  return (
    <>
      <s.Label>{text.project.brand}</s.Label>
      <s.Value>{value}</s.Value>
    </>
  )
}
export const InfoClient: FC<Partial<IProject>> = ({ client }) => {
  const { text } = useTranslate()
  const value = client ? client.name : ' --- '
  return (
    <>
      <s.Label>{text.project.client}</s.Label>
      <s.Value>{value}</s.Value>
    </>
  )
}
export const InfoAgency: FC<Partial<IProject>> = ({ agency }) => {
  const { text } = useTranslate()
  const value = agency ? agency.name : ' --- '
  return (
    <>
      <s.Label>{text.project.agency}</s.Label>
      <s.Value>{value}</s.Value>
    </>
  )
}
export const InfoOwner: FC<Partial<IProject>> = ({ owner }) => {
  const { text } = useTranslate()
  const value = owner ? owner.username : ' --- '
  return (
    <>
      <s.Label>{text.project.owner}</s.Label>
      <s.Value colorFg={appColors.main.BLUE70}>{value}</s.Value>
    </>
  )
}
export const InfoStartAt: FC<Partial<IProject>> = ({ startAt }) => {
  const { text } = useTranslate()
  const value = startAt ? toDateStr(startAt) : ' --- '
  return (
    <>
      <s.Label>{text.project.startAt}</s.Label>
      <s.Value colorFg={appColors.main.BLUE60}>{value}</s.Value>
    </>
  )
}
export const InfoDeadline: FC<Partial<IProject>> = ({ deadline }) => {
  const { text } = useTranslate()
  const value = deadline ? toDateStr(deadline) : ' --- '
  return (
    <>
      <s.Label>{text.project.deadline}</s.Label>
      <s.Value colorFg={appColors.main.ACCENT}>{value}</s.Value>
    </>
  )
}

export const InfoStatus: FC<Partial<IProject>> = ({ status }) => {
  const { text } = useTranslate()
  const color = statuses[status.code].color
  const value = status.name
  return (
    <>
      <s.Label>{text.project.status}</s.Label>
      <s.Value colorFg={color} selected={false}>
        {value}
      </s.Value>
    </>
  )
}

interface IInfoProgress extends Partial<IProject> {
  withValue?: boolean | null
}

export const InfoProgress: FC<IInfoProgress> = ({ progress, status, withValue }) => {
  const { text } = useTranslate()
  const statusColor = statuses[status.code].color
  const statusColorBg = statuses[status.code].colorBg
  return (
    <>
      {withValue && <s.Label>{text.project.progress}</s.Label>}
      <Progressbar progress={progress} colorFg={statusColor} colorBg={statusColorBg} withValue={withValue} />
    </>
  )
}

export const InfoProjectBlock: FC<Partial<IProject>> = project => {
  return (
    <>
      <div style={{ display: 'flex', columnGap: 10, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        <s.InfoGrid>
          <InfoBrand brand={project.brand} />
          <InfoClient client={project.client} />
          <InfoAgency agency={project.agency} />
          <InfoOwner owner={project.owner} />
        </s.InfoGrid>
        <s.InfoGrid>
          <InfoStartAt startAt={project.startAt} />
          <InfoDeadline deadline={project.deadline} />
          <InfoStatus status={project.status} />
          <InfoProgress progress={project.progress} status={project.status} withValue={true} />
        </s.InfoGrid>
      </div>
    </>
  )
}

export const InfoBrief: FC<Partial<IBrief>> = brief => {
  const { text } = useTranslate()

  const approved = brief.approved ? text.brief.approved : text.brief.notApproved
  const statusColor = brief.approved ? appColors.statuses.COMPETED : appColors.statuses.APPROVING

  return (
    <>
      <s.InfoProjectTitleContainer>{brief.name}</s.InfoProjectTitleContainer>
      <s.InfoGrid>
        <s.Label>{text.brief.name}</s.Label>
        <s.Value>{brief.name}</s.Value>
        <s.Label>{text.brief.originalMame}</s.Label>
        <s.Value style={{ color: `${appColors.text.HIGH}` }}>{brief.originalName}</s.Value>
        <s.Label>{text.brief.category}</s.Label>
        <s.Value>{brief.category.name}</s.Value>
        <s.Label>{text.brief.createdAt}</s.Label>
        <s.Value>
          <span style={{ color: `${appColors.main.BLUE70}` }}>{toDateStr(brief.createdAt)}</span> (
          <span style={{ color: `${appColors.main.BLUE60}` }}>{brief.createdBy.username}</span>)
        </s.Value>
        <s.Label>{text.brief.updatedAt}</s.Label>
        <s.Value>
          <span style={{ color: `${appColors.main.BLUE70}` }}>{toDateStr(brief.updatedAt)}</span> (
          <span style={{ color: `${appColors.main.BLUE60}` }}>{brief.updatedBy.username}</span>)
        </s.Value>
        <s.Label>{text.project.status}</s.Label>
        <s.Value colorFg={statusColor}>{approved}</s.Value>
      </s.InfoGrid>
    </>
  )
}
