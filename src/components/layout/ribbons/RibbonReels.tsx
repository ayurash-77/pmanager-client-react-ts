import { ReelCard } from 'entities/reels/ReelCard'
import { useDeleteReelMutation } from 'entities/reels/reels.api'
import { IReel } from 'entities/reels/reels.interfaces'
import { useOnReelClick } from 'entities/reels/useOnReelClick'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveReelsIds } from 'store/reducers/entities.reducer'
import { useAppSelector } from 'hooks/redux'
import { useTranslate } from 'hooks/useTranslate'
import { InfoReelBlock } from 'components/info-elements/InfoReelBlock'
import DeleteModal from 'components/modal/DeleteModal'
import { ContextMenu } from 'components/ui/ContextMenu/ContextMenu'
import { CommonIcons } from '../../../assets/icons/common-icons'
import * as ToolbarIcons from '../../../assets/icons/toolbar-icons'
import { ReelModal } from '../../../entities/reels/ReelModal'
import { useContextMenu } from '../../../hooks/useContextMenu'
import { usePermissions } from '../../../hooks/usePermissions'
import { setReelModal } from '../../../store/reducers/modals.reducer'
import { IContextMenuItem } from '../../ui/ContextMenu/ContextMenuItem'
import { RibbonWrapper } from './RibbonWrapper'

export const RibbonReels: FC<{ entities: IReel[] }> = ({ entities }) => {
  const dispatch = useDispatch()
  const { text } = useTranslate()

  const count: number = entities?.length || 0
  const { activeReelsIds } = useAppSelector(state => state.entities)

  const [deleteReel, { error, isSuccess, reset }] = useDeleteReelMutation()

  const [isDeleteModalShow, setDeleteModalShow] = useState(false)

  const activeReel = entities?.find(entity => activeReelsIds.includes(entity.id)) || null
  const detailsJsx = activeReel && <InfoReelBlock {...activeReel} />

  const { canCreateProject } = usePermissions()

  const { isMenuShow: isSpaceMenuShow, showContextMenu: onSpaceClickHandler, position } = useContextMenu()
  const { isItemMenuShow, onItemClickHandler } = useOnReelClick()

  const onSpaceMenuData: IContextMenuItem[] = [
    {
      title: 'New Reel',
      icon: CommonIcons.plus(),
      entityType: 'reel',
      shortcut: 'Ctrl+N',
      action: () => dispatch(setReelModal({ isOpen: true })),
      disabled: !canCreateProject,
    },
  ]

  const onItemMenuData: IContextMenuItem[] = [
    {
      title: 'New Reels',
      icon: CommonIcons.plus(),
      entityType: 'reel',
      shortcut: 'Ctrl+N',
      action: () => dispatch(setReelModal({ isOpen: true })),
    },
    {
      title: 'Add existing Shot',
      icon: CommonIcons.plus(),
      shortcut: 'Ctrl+Alt+S',
      action: () => alert('Add existing Shot'),
    },
    {
      title: 'Edit Reel',
      icon: <ToolbarIcons.Gear />,
      shortcut: 'Ctrl+E',
      action: () => alert('Edit Reel'),
    },
    {
      title: 'Delete Reel',
      icon: CommonIcons.trash(),
      variant: 'accent',
      shortcut: 'Ctrl+Del',
      action: () => alert('setDeleteModalShow(true)'),
      disabled: !canCreateProject,
    },
  ]

  const onDeleteHandler = e => {
    e.preventDefault()
    deleteReel(activeReel.id)
  }

  const onCancelHandler = () => {
    reset()
    setDeleteModalShow(false)
  }

  useEffect(() => {
    if (isSuccess) {
      setDeleteModalShow(false)
      dispatch(setActiveReelsIds([]))
    }
  }, [dispatch, isSuccess])

  return (
    <>
      <ReelModal />
      <DeleteModal
        isOpen={isDeleteModalShow}
        closeAction={onCancelHandler}
        deleteItem={activeReel}
        deleteAction={onDeleteHandler}
        error={error}
        detailsJsx={detailsJsx}
        title={`${text.actions.deleteReel} ${activeReel?.code}?`}
      />

      <ContextMenu show={isSpaceMenuShow} position={position} data={onSpaceMenuData} />
      <ContextMenu show={isItemMenuShow} position={position} data={onItemMenuData} />

      <RibbonWrapper
        variant={'reel'}
        title={text.project.reels}
        count={count}
        onClickPlus={() => dispatch(setReelModal({ isOpen: true }))}
        onClickMinus={() => setDeleteModalShow(true)}
        activeItemsIds={activeReelsIds}
        onContextMenu={onSpaceClickHandler}
      >
        {entities?.map(entity => (
          <ReelCard
            key={entity.id}
            reel={entity}
            isSelected={activeReelsIds.includes(entity.id)}
            onClick={e => onItemClickHandler(e, entity.id)}
            onContextMenu={e => onItemClickHandler(e, entity.id)}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
