import cn from 'classnames'
import { entityVariantType } from '../../types/entityVariantType'
import { InfoProgress } from '../info-elements'
import { Clapper } from '../../assets/thumbnails/thumbnails'
import Image from '../ui/Image'
import { IReel } from '../../interfaces/IReel'
import { ISequence } from '../../interfaces/ISequence'
import { IShot } from '../../interfaces/IShot'
import { EntityIcon } from './EntityIcon'
import { EntityCardContainer } from './EntityCard.styles'

interface IEntityCard {
  title?: string
  code?: string
  entity?: IReel | ISequence | IShot
  variant: entityVariantType
}

export const EntityCard = ({ variant, entity }: IEntityCard) => {
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
            <Image src={'/sampleImage.jpg'} alt={'image'} fallback={<Clapper />} />
          </div>
          <div className={cn('icon-bg', variant)}>
            <EntityIcon variant={variant} />
          </div>
        </div>
        <InfoProgress progress={60} status={status} height={2} withValue={false} m={1} />
        <div className={cn('footer', variant)}>{entity?.code}</div>
      </div>
      {variant !== 'shot' && (
        <div className={'info'}>
          {entity?.name}
          {variant === 'reel' && (
            <>
              <EntityIcon variant={'seq'} />2
              <EntityIcon variant={'shot'} />
              14
            </>
          )}
          {variant === 'seq' && <EntityIcon variant={'shot'} />}
        </div>
      )}
    </EntityCardContainer>
  )
}
