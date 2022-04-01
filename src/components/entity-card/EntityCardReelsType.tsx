import { IReelsType } from '../../interfaces/IReelsType'
import { EntityIcon } from './EntityIcon'
import { EntityCardWrapper } from './EntityCardWrapper'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import cn from 'classnames'

interface IEntityCardReelsType extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  entity: IReelsType
  isSelected: boolean
}

export const EntityCardReelsType = ({ entity, isSelected, onClick }: IEntityCardReelsType) => {
  const shotsCountArr = entity.reels?.length ? entity.reels.map(reel => reel.shots?.length) : null
  const shotsCount = shotsCountArr?.length ? shotsCountArr.reduce((acc, cur) => acc + cur) : 0

  return (
    <EntityCardWrapper entity={entity} variant={'reelsType'} isSelected={isSelected} onClick={onClick}>
      <div className={cn('info', { selected: isSelected })}>
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
