import styled from 'styled-components'
import cn from 'classnames'
import { entityVariantType } from '../../types/entityVariantType'
import { FC, ReactNode, useState } from 'react'
import * as CommonIcons from '../../assets/icons/common-icons'
import { IconButton } from '../ui'
import { IReelsType } from '../../interfaces/IReelsType'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ExpandedBlock } from '../expanded-block/ExpandedBlock'

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
  const { authUser } = useAppSelector(state => state.auth)
  const [expanded, setExpanded] = useState(true)
  const canDeleteItemRoles = ['Producer', 'Art director', 'Manager']
  const canDeleteItem = authUser.isAdmin || canDeleteItemRoles.includes(authUser.role.name)

  const headerIconsJsx = (
    <>
      {canDeleteItem && (
        <IconButton
          icon={<CommonIcons.Trash />}
          disabled={activeItemsIds?.length !== 1}
          variant={'accent'}
          onClick={activeItemsIds?.length === 1 ? onClickMinus : null}
        />
      )}
      <IconButton icon={<CommonIcons.Plus />} onClick={onClickPlus} />
    </>
  )

  return (
    <RibbonContainer>
      <ExpandedBlock
        title={`${title}: ${count}`}
        variant={variant}
        expanded={expanded}
        setExpanded={() => setExpanded(!expanded)}
        headerIcons={headerIconsJsx}
      >
        <RibbonRow className={cn({ collapse: expanded !== true })}>
          <RibbonEntities>{children}</RibbonEntities>
        </RibbonRow>
      </ExpandedBlock>
    </RibbonContainer>
  )
}
