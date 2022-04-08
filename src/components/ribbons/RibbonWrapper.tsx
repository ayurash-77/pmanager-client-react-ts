import styled from 'styled-components'
import cn from 'classnames'
import { entityVariantType } from '../../types/entityVariantType'
import { FC, ReactNode, useState } from 'react'
import * as CommonIcons from '../../assets/icons/common-icons'
import { IconButton } from '../ui'
import { IReelsType } from '../../interfaces/IReelsType'
import { FlexRow } from '../ui'
import { useAppSelector } from '../../hooks/redux'

const RibbonContainer = styled.div`
  padding: 8px 10px 4px 10px;
  background: var(--ribbon-bg);
  box-shadow: 0 0 3px var(--button-shadow);
  margin-bottom: 1px;
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

interface IRibbonWrapper {
  children?: ReactNode
  variant: entityVariantType
  reels?: IReelsType[]
  title: string
  count: number
  onClickPlus: () => void
  onClickMinus: () => void
  disableActiveItem?: () => void
  activeItemId?: number
}

export const RibbonWrapper: FC<IRibbonWrapper> = ({
  variant,
  title,
  count,
  onClickPlus,
  onClickMinus,
  children,
  activeItemId,
  disableActiveItem,
}) => {
  const [expanded, setExpanded] = useState(true)
  const { authUser } = useAppSelector(state => state.auth)
  const canDeleteItemRoles = ['Producer', 'Art director', 'Manager']
  const canDeleteItem = authUser.isAdmin || canDeleteItemRoles.includes(authUser.role.name)

  const onTitleClickHandler = () => {
    if (expanded) disableActiveItem()
    setExpanded(!expanded)
  }

  return (
    <RibbonContainer>
      <RibbonHeader className={cn(variant)}>
        <RibbonTitle onClick={onTitleClickHandler}>
          <Arrow className={cn({ collapse: expanded !== true })}>
            <IconButton icon={<CommonIcons.ArrDown />} />
          </Arrow>
          {title}: {count}
        </RibbonTitle>
        <FlexRow gap={6}>
          {canDeleteItem && (
            <IconButton
              icon={<CommonIcons.Minus />}
              disabled={!activeItemId}
              // variant={activeItemId ? 'accent' : null}
              variant={'accent'}
              onClick={activeItemId ? onClickMinus : null}
            />
          )}
          <IconButton icon={<CommonIcons.Plus />} onClick={onClickPlus} />
        </FlexRow>
      </RibbonHeader>
      <RibbonRow className={cn({ collapse: expanded !== true })}>
        <RibbonEntities>{children}</RibbonEntities>
      </RibbonRow>
    </RibbonContainer>
  )
}
