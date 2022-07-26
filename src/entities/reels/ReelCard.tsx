import cn from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { EntityIcon } from '../../components/entity-card/EntityIcon'
import { InfoProgress } from '../../components/info-elements'
import css from './ReelCard.module.scss'
import { IReel } from './reels.interfaces'

interface IEntityCardReel extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  reel: IReel
  isSelected: boolean
}

export const ReelCard: FC<IEntityCardReel> = props => {
  const { reel, isSelected, onClick, onContextMenu, onDoubleClick } = props

  const status = {
    id: 1,
    name: 'Active',
    code: 1,
    details: 'В работе',
  }
  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
      className={cn(css.container, isSelected && css.selected)}
    >
      <div className={cn(css.main, isSelected && css.selected)}>
        <div className={css.thumbnail}>
          <div className={css.image}>
            {/* <Image src={'/sampleImage.jpg'} alt={'image'} fallback={<Clapper />} /> */}
          </div>
        </div>
        <InfoProgress progress={60} status={status} height={2} withValue={false} m={1} />
        <div className={cn(css.footer, css.reel, isSelected && css.selected)}>{reel?.code}</div>
      </div>
      <div className={cn(css.info, isSelected && css.selected)}>
        <div className={css.infoTitle}>
          {reel.highPriority && <span className="highPriority" />}
          {reel.reelsType.name}
        </div>
        <div className={css.infoReelTitle}>{reel.duration} sec</div>
        <div>
          <div className={css.infoShot}>
            <EntityIcon variant={'shot'} />
            {reel.shots?.length}
          </div>
        </div>
      </div>
    </div>
  )
}
