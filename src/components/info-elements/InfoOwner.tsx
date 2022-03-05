import { FC } from 'react'
import { IProject } from '../../interfaces/IProject'
import { useTranslate } from '../../hooks/useTranslate'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'

export const InfoOwner: FC<Partial<IProject>> = ({ owner }) => {
  const { text } = useTranslate()
  const value = owner ? owner.username : ' --- '
  return (
    <>
      <InfoLabel>{text.project.owner}</InfoLabel>
      <InfoValue colorFg={'var(--user-email)'}>{value}</InfoValue>
    </>
  )
}
