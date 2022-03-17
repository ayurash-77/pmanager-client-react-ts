import { IReel } from '../../interfaces/IReel'
import { EntityIcon } from './EntityIcon'
import { EntityCardWrapper } from './EntityCardWrapper'

export const ReelCard = ({ entity }: { entity: IReel }) => {
  return (
    <EntityCardWrapper entity={entity} variant={'reel'}>
      <div className={'info'}>
        {entity?.name}
        <div className={'infoSeq'}>
          <EntityIcon variant={'seq'} />
          {entity.sequences?.length}
        </div>
        <div className={'infoShot'}>
          <EntityIcon variant={'shot'} />
          {entity.shots?.length}
        </div>
      </div>
    </EntityCardWrapper>
  )
}
