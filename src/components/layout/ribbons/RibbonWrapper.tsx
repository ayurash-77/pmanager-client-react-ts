import cn from 'classnames'
import { FC } from 'react'
import { IEntityType } from 'components/ui/ui.types'
import * as CommonIcons from '../../../assets/icons/common-icons'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { setRibbonReelsExpanded, setRibbonReelsTypesExpanded } from '../../../store/reducers/ui.reducer'
import { IconButton } from '../../ui'
import { Collapse } from '../collapse/Collapse'
import css from './RibbonWrapper.module.scss'
import { IRibbonWrapper } from './ribbonWrapper.interfaces'

export const RibbonWrapper: FC<IRibbonWrapper> = props => {
  const { variant, title, count, onClickPlus, onClickMinus, children, activeItemsIds = [] } = props
  const dispatch = useAppDispatch()

  const { authUser } = useAppSelector(state => state.auth)
  const { ribbonReels, ribbonReelsTypes } = useAppSelector(state => state.ui)

  const canDeleteItemRoles = ['Producer', 'Art director', 'Manager']
  const canDeleteItem = authUser.isAdmin || canDeleteItemRoles.includes(authUser.role.name)

  const setExpandedHandler = (variant: IEntityType) => {
    if (variant === 'reel') dispatch(setRibbonReelsExpanded(!ribbonReels.expanded))
    if (variant === 'reelsType') dispatch(setRibbonReelsTypesExpanded(!ribbonReelsTypes.expanded))
  }
  const isExpandedHandler = (variant: IEntityType) => {
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
          size={14}
          onClick={activeItemsIds?.length === 1 ? onClickMinus : null}
        />
      )}
    </>
  )

  return (
    <div className={css.container}>
      <Collapse
        title={`${title}: ${count}`}
        variant={variant}
        expanded={isExpandedHandler(variant)}
        setExpanded={() => setExpandedHandler(variant)}
        headerIcons={headerIconsJsx}
      >
        <div className={cn(css.row, !isExpandedHandler(variant) && css.collapse)}>
          <div className={css.entities}>{children}</div>
        </div>
      </Collapse>
    </div>
  )
}
