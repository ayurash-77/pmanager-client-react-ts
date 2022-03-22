import { IReelsType } from '../../interfaces/IReelsType'
import { EntityIcon } from './EntityIcon'
import { EntityCardWrapper } from './EntityCardWrapper'
import { FlexColumn } from '../ui'

export const EntityCardReelsType = ({ entity }: { entity: IReelsType }) => {
  const shotsCountArr = entity.reels?.map(reel => reel.shots?.length)

  const shotsCount = shotsCountArr.length ? shotsCountArr.reduce((acc, cur) => acc + cur) : 0
  return (
    <EntityCardWrapper entity={entity} variant={'reelsType'}>
      <div className={'info'}>
        <div className={'infoTitle'}>{entity?.name}</div>
        <div>
          <div className={'infoReel'}>
            <EntityIcon variant={'reel'} />
            {entity.reels?.length}
          </div>
          <div className={'infoShot'}>
            <EntityIcon variant={'shot'} />
            {shotsCount}
          </div>
        </div>
      </div>
    </EntityCardWrapper>
  )
}
