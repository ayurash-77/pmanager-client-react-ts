import cn from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { IReelsType } from '../../interfaces/IReelsType'
import { EntityCardReelsTypeContainer } from './EntityCardReelsType.styles'
import { EntityIcon } from './EntityIcon'

interface IEntityCardReelsType extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  entity: IReelsType
  isSelected: boolean
}

export const EntityCardReelsType: FC<IEntityCardReelsType> = props => {
  const { entity, isSelected, onClick, onContextMenu } = props

  const shotsCountArr = entity.reels?.length ? entity.reels.map(reel => reel.shots?.length) : null
  const shotsCount = shotsCountArr?.length ? shotsCountArr.reduce((acc, cur) => acc + cur) : 0

  return (
    <EntityCardReelsTypeContainer
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={cn({ selected: isSelected })}
    >
      <div className={cn('main', { selected: isSelected })}>
        <div className={cn('code', { selected: isSelected })}>{entity?.code}</div>
        <div className={cn('name', { selected: isSelected })}>{entity?.name}</div>
      </div>
      <div className={cn('info', { selected: isSelected })}>
        <div className={'infoRow'}>
          <EntityIcon variant={'reel'} />
          {entity.reels?.length}
        </div>
        <div className={'infoRow'}>
          <EntityIcon variant={'shot'} />
          {shotsCount}
        </div>
      </div>
    </EntityCardReelsTypeContainer>
  )
}
