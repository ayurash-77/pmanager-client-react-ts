import cn from 'classnames'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import * as CommonIcons from '../../assets/icons/common-icons'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IReelsType } from '../../interfaces/IReelsType'
import { setRibbonReelsExpanded, setRibbonReelsTypesExpanded } from '../../store/reducers/ui.reducer'
import { entityVariantType } from '../../types/entityVariantType'
import { ExpandedBlock } from '../expanded-block/ExpandedBlock'
import { IconButton } from '../ui'

const RibbonContainer = styled.div`
  background: var(--expanded-block-reels-bg);
  box-shadow: 0 1px 3px var(--button-shadow);
  margin-bottom: 1px;
  z-index: 1;
`

const RibbonRow = styled.div`
  transition: height 250ms, opacity 150ms;
  display: flex;

  &.collapse {
    height: 0;
    opacity: 0;
  }
`

const RibbonEntities = styled.div`
  padding-bottom: 8px;
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

export const RibbonWrapper: FC<IRibbonWrapper> = props => {
  const { variant, title, count, onClickPlus, onClickMinus, children, activeItemsIds = [] } = props
  const dispatch = useAppDispatch()

  const { authUser } = useAppSelector(state => state.auth)
  const { ribbonReels, ribbonReelsTypes } = useAppSelector(state => state.ui)

  const canDeleteItemRoles = ['Producer', 'Art director', 'Manager']
  const canDeleteItem = authUser.isAdmin || canDeleteItemRoles.includes(authUser.role.name)

  const setExpandedHandler = (variant: entityVariantType) => {
    if (variant === 'reel') dispatch(setRibbonReelsExpanded(!ribbonReels.expanded))
    if (variant === 'reelsType') dispatch(setRibbonReelsTypesExpanded(!ribbonReelsTypes.expanded))
  }
  const isExpandedHandler = (variant: entityVariantType) => {
    if (variant === 'reel') return ribbonReels.expanded
    if (variant === 'reelsType') return ribbonReelsTypes.expanded
  }

  const headerIconsJsx = (
    <>
      <IconButton icon={<CommonIcons.Plus />} onClick={onClickPlus} />
      {canDeleteItem && (
        <IconButton
          icon={<CommonIcons.Trash />}
          disabled={activeItemsIds?.length !== 1}
          variant={'accent'}
          onClick={activeItemsIds?.length === 1 ? onClickMinus : null}
        />
      )}
    </>
  )

  return (
    <RibbonContainer>
      <ExpandedBlock
        title={`${title}: ${count}`}
        variant={variant}
        expanded={isExpandedHandler(variant)}
        setExpanded={() => setExpandedHandler(variant)}
        headerIcons={headerIconsJsx}
      >
        <RibbonRow className={cn({ collapse: isExpandedHandler(variant) !== true })}>
          <RibbonEntities>{children}</RibbonEntities>
        </RibbonRow>
      </ExpandedBlock>
    </RibbonContainer>
  )
}
