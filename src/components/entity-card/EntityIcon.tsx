import cn from 'classnames'
import styled from 'styled-components'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import { entityVariantType } from '../../types/entityVariantType'

const EntityIconContainer = styled.div`
  .icon {
    display: flex;
    filter: var(--entity-icon-shadow);
    color: var(--text-high);

    &.reelsType {
      color: var(--reelsType-card-icon-fg);
    }

    &.reel {
      color: var(--reel-card-icon-fg);
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
        {variant === 'reelsType' && <ToolbarIcons.Reel />}
        {variant === 'reel' && <ToolbarIcons.Sequence />}
        {variant === 'shot' && <ToolbarIcons.Shot />}
      </div>
    </EntityIconContainer>
  )
}
