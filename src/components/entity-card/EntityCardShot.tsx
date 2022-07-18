import cn from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { IShot } from '../../interfaces/IShot'
import { InfoProgress } from '../info-elements'
import { EntityCardShotContainer } from './EntityCardShot.styles'

interface IEntityCardShot extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  entity: IShot
  isSelected: boolean
  disabled?: boolean
}

export const EntityCardShot: FC<IEntityCardShot> = props => {
  const { entity, isSelected, disabled, onClick, onDoubleClick } = props
  const status = {
    id: 1,
    name: 'Active',
    code: 1,
    details: 'В работе',
  }
  return (
    <>
      <EntityCardShotContainer onClick={onClick} onDoubleClick={onDoubleClick}>
        <div className={cn('main', { selected: isSelected }, { disabled: disabled })}>
          <div className={'thumbnail'}>
            <div className={'image'}>
              {/* <Image src={'/sampleImage.jpg'} alt={'image'} fallback={<Clapper />} /> */}
            </div>
          </div>
          <InfoProgress progress={60} status={status} height={2} withValue={false} m={1} />
          <div className={cn('footer', { selected: isSelected })}>{entity?.code}</div>
        </div>
      </EntityCardShotContainer>
    </>
  )
}
