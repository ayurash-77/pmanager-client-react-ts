import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import * as CommonIcons from '../../../assets/icons/common-icons'
import { IEntityType } from '../../../interfaces/IEntityType'
import { FlexRow, IconButton } from '../../ui'
import css from './Collapse.module.scss'

interface ICollapse {
  title?: string
  expanded?: boolean
  setExpanded?: (e) => void
  variant?: IEntityType
  headerIcons?: JSX.Element
  children?: ReactNode
}

export const Collapse: FC<ICollapse> = props => {
  const { children, title, expanded, setExpanded, headerIcons, variant = 'shot' } = props

  return (
    <div className={css.container}>
      <div className={cn(css.header, css[variant])}>
        <div className={css.title} onClick={setExpanded}>
          <div className={cn(css.arrow, !expanded && css.collapse)}>
            <IconButton icon={<CommonIcons.ArrDown />} />
          </div>
          {title}
        </div>

        <FlexRow gap={6}>{headerIcons}</FlexRow>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            exit={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, overflow: 'hidden' }}
          >
            <div className={css.body}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}