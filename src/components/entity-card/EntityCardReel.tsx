import { EntityIcon } from './EntityIcon'
import { EntityCardWrapper } from './EntityCardWrapper'
import { IReel } from '../../interfaces/IReel'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import cn from 'classnames'

interface IEntityCardReel extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  entity: IReel
  isSelected: boolean
}

export const EntityCardReel = ({ entity, isSelected, onClick, onDoubleClick }: IEntityCardReel) => {
  return (
    <EntityCardWrapper
      entity={entity}
      variant={'reel'}
      isSelected={isSelected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className={cn('info', { selected: isSelected })}>
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
