import styled from 'styled-components'
import { entityVariantType } from '../../types/entityVariantType'
import cn from 'classnames'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'

const EntityIconContainer = styled.div`
  .icon {
    display: flex;
    filter: var(--entity-icon-shadow);
    color: var(--text-high);

    &.reel {
      color: var(--reel-card-icon-fg);
    }

    &.seq {
      color: var(--seq-card-icon-fg);
    }

    &.shot {
      color: var(--shot-card-icon-fg);
    }
  }
`

interface IEntityIcon {
  variant: entityVariantType
}

export const EntityIcon = ({ variant }: IEntityIcon) => {
  return (
    <EntityIconContainer>
      <div className={cn('icon', variant)}>
        {variant === 'reel' && <ToolbarIcons.Reel />}
        {variant === 'seq' && <ToolbarIcons.Sequence />}
        {variant === 'shot' && <ToolbarIcons.Shot />}
      </div>
    </EntityIconContainer>
  )
}
