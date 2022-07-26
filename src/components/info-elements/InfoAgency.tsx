import { FC } from 'react'
import { IProject } from '../../entities/projects/projects.interfaces'
import { useTranslate } from '../../hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'

export const InfoAgency: FC<Partial<IProject>> = ({ agency }) => {
  const { text } = useTranslate()
  const value = agency ? agency.name : ' --- '
  return (
    <>
      <InfoLabel>{text.project.agency}</InfoLabel>
      <InfoValue>{value}</InfoValue>
    </>
  )
}
