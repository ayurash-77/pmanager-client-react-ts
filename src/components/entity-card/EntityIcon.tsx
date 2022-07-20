import cn from 'classnames'
import styled from 'styled-components'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import { IEntityType } from '../../interfaces/IEntityType'

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
  variant: IEntityType
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
