import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import * as CommonIcons from '../../assets/icons/common-icons'
import { entityVariantType } from '../../types/entityVariantType'
import { FlexRow, IconButton } from '../ui'

const ExpandedBlockContainer = styled.div`
  background: var(--expanded-block-reels-bg);
  box-shadow: 0 1px 3px var(--button-shadow);
  z-index: 1;

  .body {
    display: flex;
    padding: 5px 10px;
    flex-direction: column;
    gap: 15px;
  }
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

const Title = styled.h3`
  user-select: none;
  cursor: default;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  background: var(--expanded-block-title-bg);
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

interface IExpandedBlock {
  title?: string
  expanded?: boolean
  setExpanded?: (e) => void
  variant?: entityVariantType
  headerIcons?: JSX.Element
  children?: ReactNode
}

export const ExpandedBlock: FC<IExpandedBlock> = props => {
  const { children, title, expanded, setExpanded, headerIcons, variant = 'shot' } = props

  return (
    <ExpandedBlockContainer>
      <RibbonHeader className={cn(variant)}>
        <Title onClick={setExpanded}>
          <Arrow className={cn({ collapse: expanded !== true })}>
            <IconButton icon={<CommonIcons.ArrDown />} />
          </Arrow>
          {title}
        </Title>

        <FlexRow gap={6}>{headerIcons}</FlexRow>
      </RibbonHeader>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            exit={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, overflow: 'hidden' }}
          >
            <div className={cn('body')}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExpandedBlockContainer>
  )
}
