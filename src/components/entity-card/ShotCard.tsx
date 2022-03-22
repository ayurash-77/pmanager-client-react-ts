import { IReelType } from '../../interfaces/IReelType'
import { EntityIcon } from './EntityIcon'
import { EntityCardWrapper } from './EntityCardWrapper'
import { IReel } from '../../interfaces/IReel'
import { IShot } from '../../interfaces/IShot'

export const ShotCard = ({ entity }: { entity: IShot }) => {
  return <EntityCardWrapper entity={entity} variant={'shot'} />
}
