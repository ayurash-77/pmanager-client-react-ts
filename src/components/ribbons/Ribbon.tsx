import styled from 'styled-components'
import { EntityCard } from '../entity-card/EntityCard'
import cn from 'classnames'
import { useTranslate } from '../../hooks/useTranslate'
import { entityVariantType } from '../../types/entityVariantType'
import { useState } from 'react'
import * as CommonIcons from '../../assets/icons/common-icons'
import { IconButton } from '../ui'

const Container = styled.div`
  padding: 8px 10px 4px 10px;
  background: var(--ribbon-bg);
  box-shadow: 0 0 3px var(--button-shadow);
`

const RibbonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;

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

const RibbonTitle = styled.h3`
  text-transform: uppercase;
  cursor: default;
  display: flex;
  gap: 5px;
`

const Arrow = styled.div`
  transition: transform 250ms;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  transform: rotate(0);
  &.collapse {
    transform: rotate(-90deg);
  }
`

const RibbonRow = styled.div`
  transition: height 250ms, opacity 150ms;
  display: flex;
  height: 80px;
  &.collapse {
    height: 0;
    opacity: 0;
  }
`

const RibbonEntities = styled.div`
  min-width: 0;
  display: flex;
  gap: 11px;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;
  opacity: 1;
`

interface IRibbon {
  variant: entityVariantType
}

export const Ribbon = ({ variant }: IRibbon) => {
  const { text } = useTranslate()
  const [expanded, setExpanded] = useState(true)
  return (
    <Container>
      <RibbonHeader className={cn(variant)}>
        <RibbonTitle onClick={() => setExpanded(!expanded)}>
          <Arrow className={cn({ collapse: expanded !== true })}>
            <IconButton icon={<CommonIcons.ArrDown />} />
          </Arrow>
          {variant === 'reel' && text.project.reels}
          {variant === 'seq' && text.project.sequences}
          {variant === 'shot' && text.project.shots}:
        </RibbonTitle>
        <IconButton icon={<CommonIcons.Plus />} onClick={() => console.log('PLUS CLICKED')} />
      </RibbonHeader>
      <RibbonRow className={cn({ collapse: expanded !== true })}>
        <RibbonEntities>
          <EntityCard variant={variant} />
          <EntityCard variant={variant} />
          <EntityCard variant={variant} />
          <EntityCard variant={variant} />
          <EntityCard variant={variant} />
          <EntityCard variant={variant} />
          <EntityCard variant={variant} />
          <EntityCard variant={variant} />
          <EntityCard variant={variant} />
        </RibbonEntities>
      </RibbonRow>
    </Container>
  )
}
