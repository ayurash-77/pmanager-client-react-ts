import { IReel } from '../../interfaces/IReel'
import { EntityIcon } from './EntityIcon'
import { EntityCardWrapper } from './EntityCardWrapper'
import { ISequence } from '../../interfaces/ISequence'

export const SeqCard = ({ entity }: { entity: ISequence }) => {
  return (
    <EntityCardWrapper entity={entity} variant={'seq'}>
      <div className={'info'}>
        {/* {entity?.name} */}
        <div className={'infoSeqTitle'}>{entity.name}</div>
        <div />
        <div className={'infoShot'}>
          <EntityIcon variant={'shot'} />0
        </div>
      </div>
    </EntityCardWrapper>
  )
}
