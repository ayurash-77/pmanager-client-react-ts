import { FC } from 'react'
import { IProject } from '../../interfaces/IProject'
import { useTranslate } from '../../hooks/useTranslate'
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
