import { FC } from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
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
