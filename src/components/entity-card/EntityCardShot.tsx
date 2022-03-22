import { IReelsType } from '../../interfaces/IReelsType'
import { EntityIcon } from './EntityIcon'
import { EntityCardWrapper } from './EntityCardWrapper'
import { IReel } from '../../interfaces/IReel'
import { IShot } from '../../interfaces/IShot'

export const EntityCardShot = ({ entity }: { entity: IShot }) => {
  return <EntityCardWrapper entity={entity} variant={'shot'} />
}
