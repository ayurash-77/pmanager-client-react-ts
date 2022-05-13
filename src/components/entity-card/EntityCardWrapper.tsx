import cn from 'classnames'
import { InfoProgress } from '../info-elements'
import { IReelsType } from '../../interfaces/IReelsType'
import { IReel } from '../../interfaces/IReel'
import { IShot } from '../../interfaces/IShot'
import { EntityCardContainer } from './EntityCard.styles'
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react'
import { entityVariantType } from '../../types/entityVariantType'
import { Image } from '../ui'
import { Clapper } from '../../assets/thumbnails/thumbnails'

interface IEntityCardWrapper extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode
  variant: entityVariantType
  isSelected?: boolean
  disabled?: boolean
  draggable?: boolean
  entity: IReelsType | IReel | IShot
}

export const EntityCardWrapper: FC<IEntityCardWrapper> = ({
  entity,
  variant,
  isSelected = false,
  disabled = false,
  children,
  onClick,
  onDoubleClick,
  draggable,
}) => {
  const status = {
    id: 1,
    name: 'Active',
    code: 1,
    details: 'В работе',
  }

  return (
    <EntityCardContainer
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      // draggable={draggable}
      className={cn({ draggable: draggable })}
    >
      <div
        className={cn(
          'main',
          variant,
          { draggable: draggable },
          { selected: isSelected },
          { disabled: disabled }
        )}
      >
        <div className={'thumbnail'}>
          <div className={'image'}>
            {/* <Image src={'/sampleImage.jpg'} alt={'image'} fallback={<Clapper />} /> */}
          </div>
          {/* <div className={cn('icon-bg', variant)}> */}
          {/*   <EntityIcon variant={variant} /> */}
          {/* </div> */}
        </div>
        <InfoProgress progress={60} status={status} height={2} withValue={false} m={1} />
        <div className={cn('footer', variant, { selected: isSelected })}>{entity?.code}</div>
      </div>
      {children}
    </EntityCardContainer>
  )
}
