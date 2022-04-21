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
  background: var(--expanded-block-reels-bg);
  box-shadow: 0 1px 3px var(--button-shadow);
  margin-bottom: 1px;
  z-index: 1;
`

const RibbonHeader = styled.div`
  padding: 0 8px;
  display: flex;
  align-items: center;
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

  background: var(--expanded-block-title-bg);
`

const RibbonTitle = styled.h3`
  height: 26px;
  user-select: none;
  cursor: default;
  display: flex;
  align-items: center;
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
  height: 90px;
  &.collapse {
    height: 0;
    opacity: 0;
  }
`

const RibbonEntities = styled.div`
  margin: 5px 10px;
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
  activeItemsIds: number[]
}

export const RibbonWrapper: FC<IRibbonWrapper> = ({
  variant,
  title,
  count,
  onClickPlus,
  onClickMinus,
  children,
  activeItemsIds = [],
}) => {
  const [expanded, setExpanded] = useState(true)
  const { authUser } = useAppSelector(state => state.auth)
  const canDeleteItemRoles = ['Producer', 'Art director', 'Manager']
  const canDeleteItem = authUser.isAdmin || canDeleteItemRoles.includes(authUser.role.name)

  const onTitleClickHandler = () => {
    // if (expanded) disableActiveItem()
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
              disabled={activeItemsIds.length !== 1}
              // variant={activeItemId ? 'accent' : null}

              variant={'accent'}
              onClick={activeItemsIds.length === 1 ? onClickMinus : null}
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
