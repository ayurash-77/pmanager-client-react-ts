import cn from 'classnames'
import { InfoProgress } from '../info-elements'
import { Clapper } from '../../assets/thumbnails/thumbnails'
import Image from '../ui/Image'
import { IReelType } from '../../interfaces/IReelType'
import { IReel } from '../../interfaces/IReel'
import { IShot } from '../../interfaces/IShot'
import { EntityIcon } from './EntityIcon'
import { EntityCardContainer } from './EntityCard.styles'
import { FC, ReactNode } from 'react'
import { entityVariantType } from '../../types/entityVariantType'

interface IEntityCardWrapper {
  children?: ReactNode
  variant: entityVariantType
  entity: IReelType | IReel | IShot
}

export const EntityCardWrapper: FC<IEntityCardWrapper> = ({ entity, variant, children }) => {
  const status = {
    id: 1,
    name: 'Active',
    code: 1,
    details: 'В работе',
  }

  return (
    <EntityCardContainer>
      <div className={'main'}>
        <div className={'thumbnail'}>
          <div className={'image'}>
            {/* <Image src={'/sampleImage.jpg'} alt={'image'} fallback={<Clapper />} /> */}
          </div>
          <div className={cn('icon-bg', variant)}>
            <EntityIcon variant={variant} />
          </div>
        </div>
        <InfoProgress progress={60} status={status} height={2} withValue={false} m={1} />
        <div className={cn('footer', variant)}>{entity?.code}</div>
      </div>
      {children}
    </EntityCardContainer>
  )
}
