import { EntityCardWrapper } from './EntityCardWrapper'
import { IShot } from '../../interfaces/IShot'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface IEntityCardShot extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  entity: IShot
  // onClick: () => void
  isSelected: boolean
  disabled?: boolean
}

export const EntityCardShot = ({ entity, isSelected, disabled, onClick }: IEntityCardShot) => {
  return (
    <EntityCardWrapper
      entity={entity}
      variant={'shot'}
      isSelected={isSelected}
      disabled={disabled}
      onClick={onClick}
    />
  )
}
