import styled from 'styled-components'
import { EntityCard } from '../entity-card/EntityCard'
import cn from 'classnames'
import { useTranslate } from '../../hooks/useTranslate'
import { entityVariantType } from '../../types/entityVariantType'

const Container = styled.div`
  padding: 8px 10px 4px 10px;
  background: var(--ribbon-bg);
  box-shadow: 0 0 3px var(--button-shadow);
`

const RibbonTitle = styled.h3`
  text-transform: uppercase;

  &.reel {
    color: var(--ribbon-reel-fg);
  }

  &.seq {
    color: var(--ribbon-seq-fg);
  }

  &.shot {
    color: var(--ribbon-shot-fg);
  }
`

const RibbonRow = styled.div`
  min-width: 0;
  height: 80px;
  display: flex;
  gap: 10px;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;
`

interface IRibbon {
  variant: entityVariantType
}

export const Ribbon = ({ variant }: IRibbon) => {
  const { text } = useTranslate()
  return (
    <Container>
      <RibbonTitle className={cn(variant)}>
        {variant === 'reel' && text.project.reels}
        {variant === 'seq' && text.project.sequences}
        {variant === 'shot' && text.project.shots}:
      </RibbonTitle>
      <RibbonRow>
        <EntityCard variant={variant} />
        <EntityCard variant={variant} />
        <EntityCard variant={variant} />
        <EntityCard variant={variant} />
        <EntityCard variant={variant} />
        <EntityCard variant={variant} />
        <EntityCard variant={variant} />
        <EntityCard variant={variant} />
        <EntityCard variant={variant} />
      </RibbonRow>
    </Container>
  )
}
