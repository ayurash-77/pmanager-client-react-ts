import cn from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { EntityIcon } from '../../components/entity-card/EntityIcon'
import css from './ReelsTypeCard.module.scss'
import { IReelsType } from './reelsTypes.interfaces'

interface IEntityCardReelsType extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  entity: IReelsType
  isSelected: boolean
}

export const ReelsTypeCard: FC<IEntityCardReelsType> = props => {
  const { entity, isSelected, onClick, onContextMenu } = props

  const shotsCountArr = entity.reels?.length ? entity.reels.map(reel => reel.shots?.length) : null
  const shotsCount = shotsCountArr?.length ? shotsCountArr.reduce((acc, cur) => acc + cur) : 0

  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={cn(css.container, isSelected && css.selected)}
    >
      <div className={cn(css.main, isSelected && css.selected)}>
        <div className={cn(css.code, isSelected && css.selected)}>{entity?.code}</div>
        <div className={cn(css.name, isSelected && css.selected)}>{entity?.name}</div>
      </div>
      <div className={cn(css.info, isSelected && css.selected)}>
        <div className={css.infoRow}>
          <EntityIcon variant={'reel'} />
          {entity.reels?.length}
        </div>
        <div className={css.infoRow}>
          <EntityIcon variant={'shot'} />
          {shotsCount}
        </div>
      </div>
    </div>
  )
}
