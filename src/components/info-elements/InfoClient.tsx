import { FC } from 'react'
import { IProject } from '../../entities/projects/projects.interfaces'
import { useTranslate } from '../../hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'

export const InfoClient: FC<Partial<IProject>> = ({ client }) => {
  const { text } = useTranslate()
  const value = client ? client.name : ' --- '
  return (
    <>
      <InfoLabel>{text.project.client}</InfoLabel>
      <InfoValue>{value}</InfoValue>
    </>
  )
}
