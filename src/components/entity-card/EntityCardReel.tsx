import { EntityIcon } from './EntityIcon'
import { EntityCardWrapper } from './EntityCardWrapper'
import { IReel } from '../../interfaces/IReel'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import cn from 'classnames'

interface IEntityCardReel extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  reel: IReel
  isSelected: boolean
}

export const EntityCardReel: FC<IEntityCardReel> = props => {
  const { reel, isSelected, onClick, onDoubleClick } = props
  return (
    <EntityCardWrapper
      entity={reel}
      variant={'reel'}
      isSelected={isSelected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className={cn('info', { selected: isSelected })}>
        <div className={'infoTitle'}>
          {reel.highPriority && <span className="highPriority" />}
          {reel.code}
        </div>
        <div className={'infoReelTitle'}>{reel.duration} sec</div>
        <div>
          <div className={'infoShot'}>
            <EntityIcon variant={'shot'} />
            {reel.shots?.length}
          </div>
        </div>
      </div>
    </EntityCardWrapper>
  )
}
