import styled from 'styled-components'
import cn from 'classnames'
import { useTranslate } from '../../hooks/useTranslate'
import { entityVariantType } from '../../types/entityVariantType'
import { useState } from 'react'
import * as CommonIcons from '../../assets/icons/common-icons'
import { IconButton } from '../ui'
import { IReelType } from '../../interfaces/IReelType'
import { ReelsTypeCard } from '../entity-card/ReelsTypeCard'
import { IReel } from '../../interfaces/IReel'
import { IShot } from '../../interfaces/IShot'
import { ReelCard } from '../entity-card/ReelCard'
import { ShotCard } from '../entity-card/ShotCard'

const RibbonContainer = styled.div`
  padding: 8px 10px 4px 10px;
  background: var(--ribbon-bg);
  box-shadow: 0 0 3px var(--button-shadow);
`

const RibbonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;

  &.reelsType {
    color: var(--ribbon-reelsType-fg);
  }

  &.reel {
    color: var(--ribbon-reel-fg);
  }

  &.shot {
    color: var(--ribbon-shot-fg);
  }
`

const RibbonTitle = styled.h3`
  //text-transform: uppercase;
  user-select: none;
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
  gap: 20px;
  align-items: center;
  overflow-y: hidden;
  overflow-x: auto;
  opacity: 1;
`

interface IRibbon {
  variant: entityVariantType
  reels?: IReelType[]
  entities?: IReelType[] | IReel[] | IShot[]
}

export const Ribbon = ({ variant, entities }: IRibbon) => {
  const { text } = useTranslate()
  const [expanded, setExpanded] = useState(true)
  return (
    <RibbonContainer>
      <RibbonHeader className={cn(variant)}>
        <RibbonTitle onClick={() => setExpanded(!expanded)}>
          <Arrow className={cn({ collapse: expanded !== true })}>
            <IconButton icon={<CommonIcons.ArrDown />} />
          </Arrow>
          {variant === 'reelsType' && text.project.reelsTypes}
          {variant === 'reel' && text.project.reels}
          {variant === 'shot' && text.project.shots}: {entities?.length}
        </RibbonTitle>
        <IconButton icon={<CommonIcons.Plus />} onClick={() => console.log('PLUS CLICKED')} />
      </RibbonHeader>
      <RibbonRow className={cn({ collapse: expanded !== true })}>
        <RibbonEntities>
          {variant === 'reelsType' &&
            entities?.map(entity => <ReelsTypeCard key={entity.id} entity={entity} />)}
          {variant === 'reel' && entities?.map(entity => <ReelCard key={entity.id} entity={entity} />)}
          {variant === 'shot' && entities?.map(entity => <ShotCard key={entity.id} entity={entity} />)}
        </RibbonEntities>
      </RibbonRow>
    </RibbonContainer>
  )
}
