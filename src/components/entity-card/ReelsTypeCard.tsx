import { IReelType } from '../../interfaces/IReelType'
import { EntityIcon } from './EntityIcon'
import { EntityCardWrapper } from './EntityCardWrapper'
import { FlexColumn } from '../ui'

export const ReelsTypeCard = ({ entity }: { entity: IReelType }) => {
  const shotsCount = entity.reels?.map(reel => reel.shots?.length).reduce((acc, cur) => acc + cur)
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
