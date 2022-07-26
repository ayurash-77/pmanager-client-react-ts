import cn from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { InfoProgress } from '../../components/info-elements'
import css from './ShotCard.module.scss'
import { IShot } from './shots.interfaces'

interface IEntityCardShot extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  entity: IShot
  isSelected: boolean
  disabled?: boolean
}

export const ShotCard: FC<IEntityCardShot> = props => {
  const { entity, isSelected, disabled, onClick, onContextMenu, onDoubleClick } = props
  const status = {
    id: 1,
    name: 'Active',
    code: 1,
    details: 'В работе',
  }
  return (
    <>
      <div
        className={css.container}
        onClick={onClick}
        onContextMenu={onContextMenu}
        onDoubleClick={onDoubleClick}
      >
        <div className={cn(css.main, isSelected && css.selected, disabled && css.disabled)}>
          <div className={css.thumbnail}>
            <div className={css.image}>
              {/* <Image src={'/sampleImage.jpg'} alt={'image'} fallback={<Clapper />} /> */}
            </div>
          </div>
          <InfoProgress progress={60} status={status} height={2} withValue={false} m={1} />
          <div className={cn(css.footer, isSelected && css.selected)}>{entity?.code}</div>
        </div>
      </div>
    </>
  )
}
