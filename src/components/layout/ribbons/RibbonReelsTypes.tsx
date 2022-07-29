import { IReelsType } from 'entities/reelsTypes/reelsTypes.interfaces'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CommonIcons } from '../../../assets/icons/common-icons'
import * as ToolbarIcons from '../../../assets/icons/toolbar-icons'
import { ReelsTypeCard } from '../../../entities/reelsTypes/ReelsTypeCard'
import ReelsTypeModal from '../../../entities/reelsTypes/ReelsTypeModal'
import { useDeleteReelsTypeMutation } from '../../../entities/reelsTypes/reelsTypes.api'
import { useOnReelsTypeClick } from '../../../entities/reelsTypes/useOnReelsTypeClick'
import { useAppSelector } from '../../../hooks/redux'
import { useContextMenu } from '../../../hooks/useContextMenu'
import { usePermissions } from '../../../hooks/usePermissions'
import { useTranslate } from '../../../hooks/useTranslate'
import { setActiveReelsTypeId } from '../../../store/reducers/entities.reducer'
import { setReelsTypeModal } from '../../../store/reducers/modals.reducer'
import { InfoReelsTypeBlock } from '../../info-elements/InfoReelsTypeBlock'
import DeleteModal from '../../modal/DeleteModal'
import { ContextMenu } from '../../ui/ContextMenu/ContextMenu'
import { IContextMenuItem } from '../../ui/ContextMenu/ContextMenuItem'
import { RibbonWrapper } from './RibbonWrapper'

export const RibbonReelsTypes: FC<{ entities: IReelsType[] }> = ({ entities }) => {
  const dispatch = useDispatch()
  const { text } = useTranslate()
  const count: number = entities?.length || 0

  const [deleteReelsType, { error, isSuccess, reset }] = useDeleteReelsTypeMutation()

  const { activeReelsTypeId } = useAppSelector(state => state.entities)

  const { canCreateProject } = usePermissions()

  const { isMenuShow: isSpaceMenuShow, showContextMenu: onSpaceClickHandler, position } = useContextMenu()
  const { isItemMenuShow, onItemClickHandler } = useOnReelsTypeClick()

  const [isDeleteModalShow, setDeleteModalShow] = useState(false)

  const activeReelsType = entities?.find(entity => entity.id === activeReelsTypeId) || null
  const detailsJsx = activeReelsType && <InfoReelsTypeBlock {...activeReelsType} />

  const spaceMenuData: IContextMenuItem[] = [
    {
      title: 'New Reels Type',
      icon: CommonIcons.plus(),
      entityType: 'reelsType',
      shortcut: 'Ctrl+N',
      action: () => dispatch(setReelsTypeModal({ isOpen: true })),
      disabled: !canCreateProject,
    },
  ]

  const itemMenuData: IContextMenuItem[] = [
    {
      title: 'New Reels Type',
      icon: CommonIcons.plus(),
      entityType: 'reelsType',
      shortcut: 'Ctrl+N',
      action: () => dispatch(setReelsTypeModal({ isOpen: true })),
    },
    {
      title: 'Add existing Reel',
      icon: CommonIcons.plus(),
      shortcut: 'Ctrl+Alt+R',
      action: () => alert('Add Reel'),
    },
    {
      title: 'Edit Reels Type',
      icon: <ToolbarIcons.Gear />,
      shortcut: 'Ctrl+E',
      action: () => alert('Edit Reels Type'),
    },
    {
      title: 'Delete Reels Type',
      icon: CommonIcons.trash(),
      variant: 'accent',
      shortcut: 'Ctrl+Del',
      action: () => setDeleteModalShow(true),
      disabled: !canCreateProject,
    },
  ]

  const onDeleteHandler = async e => {
    e.preventDefault()
    await deleteReelsType(activeReelsTypeId)
  }

  const onCancelHandler = () => {
    reset()
    setDeleteModalShow(false)
  }

  useEffect(() => {
    if (isSuccess) {
      setDeleteModalShow(false)
      dispatch(setActiveReelsTypeId(null))
    }
  }, [dispatch, isSuccess])

  return (
    <>
      <ReelsTypeModal />
      <DeleteModal
        isOpen={isDeleteModalShow}
        closeAction={onCancelHandler}
        deleteItem={activeReelsType}
        deleteAction={onDeleteHandler}
        error={error}
        detailsJsx={detailsJsx}
        title={`${text.actions.deleteReelsType} ${activeReelsType?.code}?`}
      />

      <ContextMenu show={isSpaceMenuShow} position={position} data={spaceMenuData} />
      <ContextMenu show={isItemMenuShow} position={position} data={itemMenuData} />

      <RibbonWrapper
        variant={'reelsType'}
        title={text.project.reelsTypes}
        count={count}
        onClickPlus={() => dispatch(setReelsTypeModal({ isOpen: true }))}
        onClickMinus={() => setDeleteModalShow(true)}
        activeItemsIds={activeReelsTypeId && [activeReelsTypeId]}
        onContextMenu={onSpaceClickHandler}
      >
        {entities?.map(entity => (
          <ReelsTypeCard
            key={entity.id}
            entity={entity}
            isSelected={activeReelsTypeId === entity.id}
            onClick={e => onItemClickHandler(e, entity.id)}
            onContextMenu={e => onItemClickHandler(e, entity.id)}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
