import cn from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { IReel } from '../../interfaces/IReel'
import { InfoProgress } from '../info-elements'
import { EntityCardReelContainer } from './EntityCardReel.styles'
import { EntityIcon } from './EntityIcon'

interface IEntityCardReel extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  reel: IReel
  isSelected: boolean
}

export const EntityCardReel: FC<IEntityCardReel> = props => {
  const { reel, isSelected, onClick, onDoubleClick } = props

  const status = {
    id: 1,
    name: 'Active',
    code: 1,
    details: 'В работе',
  }
  return (
    <EntityCardReelContainer
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={cn({ selected: isSelected })}
    >
      <div className={cn('main', { selected: isSelected })}>
        <div className={'thumbnail'}>
          <div className={'image'}>
            {/* <Image src={'/sampleImage.jpg'} alt={'image'} fallback={<Clapper />} /> */}
          </div>
        </div>
        <InfoProgress progress={60} status={status} height={2} withValue={false} m={1} />
        <div className={cn('footer', 'reel', { selected: isSelected })}>{reel?.code}</div>
      </div>
      <div className={cn('info', { selected: isSelected })}>
        <div className={'infoTitle'}>
          {reel.highPriority && <span className="highPriority" />}
          {reel.reelsType.name}
        </div>
        <div className={'infoReelTitle'}>{reel.duration} sec</div>
        <div>
          <div className={'infoShot'}>
            <EntityIcon variant={'shot'} />
            {reel.shots?.length}
          </div>
        </div>
      </div>
    </EntityCardReelContainer>
  )
}
