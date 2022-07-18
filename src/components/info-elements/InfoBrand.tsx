import { FC } from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
import { InfoLabel } from './InfoLabel'
import { InfoValue } from './InfoValue'

export const InfoBrand: FC<Partial<IProject>> = ({ brand }) => {
  const { text } = useTranslate()
  const value = brand ? brand.name : ' --- '
  return (
    <>
      <InfoLabel>{text.project.brand}</InfoLabel>
      <InfoValue>{value}</InfoValue>
    </>
  )
}
