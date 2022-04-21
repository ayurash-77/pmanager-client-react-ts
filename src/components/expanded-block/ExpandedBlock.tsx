import { FC, useState } from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import { IconButton } from '../ui'
import * as CommonIcons from '../../assets/icons/common-icons'
import { motion, AnimatePresence } from 'framer-motion'

const ExpandedBlockContainer = styled.div`
  background: var(--expanded-block-reels-bg);
  box-shadow: 0 1px 3px var(--button-shadow);
  z-index: 1;

  .body {
    display: flex;
    padding: 6px 10px;
    flex-direction: column;
  }
`

const Title = styled.h3`
  padding: 0 8px;
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
}

export const ExpandedBlock: FC<IExpandedBlock> = props => {
  const { children, title } = props

  const [expanded, setExpanded] = useState(false)

  const onTitleClickHandler = () => {
    setExpanded(!expanded)
  }

  return (
    <ExpandedBlockContainer>
      <Title onClick={onTitleClickHandler}>
        <Arrow className={cn({ collapse: expanded !== true })}>
          <IconButton icon={<CommonIcons.ArrDown />} />
        </Arrow>
        {title}
      </Title>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            // transition={{ type: 'spring' }}
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
