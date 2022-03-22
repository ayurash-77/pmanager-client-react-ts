import { EntityIcon } from './EntityIcon'
import { EntityCardWrapper } from './EntityCardWrapper'
import { IReel } from '../../interfaces/IReel'

export const EntityCardReel = ({ entity }: { entity: IReel }) => {
  return (
    <EntityCardWrapper entity={entity} variant={'reel'}>
      <div className={'info'}>
        <div className={'infoTitle'}>{entity.reelsType?.name}</div>
        <div className={'infoReelTitle'}>{entity.duration} sec</div>
        <div>
          <div className={'infoShot'}>
            <EntityIcon variant={'shot'} />
            {entity.shots?.length}
          </div>
        </div>
      </div>
    </EntityCardWrapper>
  )
}
