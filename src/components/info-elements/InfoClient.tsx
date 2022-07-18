import { FC } from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
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
