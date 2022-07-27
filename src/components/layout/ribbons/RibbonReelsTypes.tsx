import { skipToken } from '@reduxjs/toolkit/query'
import { IReelsType } from 'entities/reelsTypes/reelsTypes.interfaces'
import { useEffect, useState } from 'react'
import * as CommonIcons from '../../../assets/icons/common-icons'
import * as ToolbarIcons from '../../../assets/icons/toolbar-icons'
import { IProject } from '../../../entities/projects/projects.interfaces'
import { useGetReelsQuery } from '../../../entities/reels/reels.api'
import NewReelsTypeModal from '../../../entities/reelsTypes/NewReelsTypeModal'
import { ReelsTypeCard } from '../../../entities/reelsTypes/ReelsTypeCard'
import { useDeleteReelsTypeMutation } from '../../../entities/reelsTypes/reelsTypes.api'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useContextMenu } from '../../../hooks/useContextMenu'
import { useOnReelsTypeClick } from '../../../hooks/useOnReelsTypeClick'
import { usePermissions } from '../../../hooks/usePermissions'
import { useTranslate } from '../../../hooks/useTranslate'
import { setActiveReelsTypeId } from '../../../store/reducers/entities.reducer'
import { setNewReelsTypeModalShow } from '../../../store/reducers/modals.reducer'
import { InfoReelsTypeBlock } from '../../info-elements/InfoReelsTypeBlock'
import DeleteModal from '../../modal/DeleteModal'
import { ContextMenu } from '../../ui/ContextMenu/ContextMenu'
import { ContextMenuItem, IContextMenuItem } from '../../ui/ContextMenu/ContextMenuItem'
import { RibbonWrapper } from './RibbonWrapper'

export const RibbonReelsTypes = ({ entities, project }: { entities: IReelsType[]; project: IProject }) => {
  const { text } = useTranslate()
  const count: number = entities?.length || 0

  const [deleteReelsType, { error, isSuccess, reset }] = useDeleteReelsTypeMutation()
  const { refetch: refetchReels } = useGetReelsQuery(project?.id ?? skipToken)

  const { activeReelsTypeId } = useAppSelector(state => state.entities)
  const dispatch = useAppDispatch()

  const { newReelsTypeModalShow } = useAppSelector(state => state.modals)
  const { canCreateProject, canEditProject, canDeleteProject } = usePermissions()
  const { position, isMenuShow: isMainMenuShow, showContextMenu } = useContextMenu()
  const { onReelsTypeClickHandler, isMenuShow } = useOnReelsTypeClick()

  const [isDeleteModalShow, setDeleteModalShow] = useState(false)

  const activeReelsType = entities?.find(entity => entity.id === activeReelsTypeId) || null
  const detailsJsx = activeReelsType && <InfoReelsTypeBlock {...activeReelsType} />

  const reelsContextMenuData: IContextMenuItem[] = [
    {
      title: 'New Reels Type',
      icon: <CommonIcons.Plus />,
      entityType: 'reelsType',
      shortcut: 'Ctrl+N',
      action: () => dispatch(setNewReelsTypeModalShow(true)),
      disabled: !canCreateProject,
    },
  ]

  const reelTypeContextMenuData: IContextMenuItem[] = [
    {
      title: 'New Reels Type',
      icon: <CommonIcons.Plus />,
      entityType: 'reelsType',
      shortcut: 'Ctrl+N',
      action: () => dispatch(setNewReelsTypeModalShow(true)),
    },
    {
      title: 'Add existing Reel',
      icon: <CommonIcons.Plus />,
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
      icon: <CommonIcons.Trash />,
      variant: 'accent',
      shortcut: 'Ctrl+Del',
      action: () => setDeleteModalShow(true),
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
      refetchReels()
    }
  }, [dispatch, isSuccess, refetchReels])

  return (
    <>
      <NewReelsTypeModal
        isOpen={newReelsTypeModalShow}
        closeAction={() => dispatch(setNewReelsTypeModalShow(false))}
        project={project}
      />
      <DeleteModal
        isOpen={isDeleteModalShow}
        closeAction={onCancelHandler}
        deleteItem={activeReelsType}
        deleteAction={onDeleteHandler}
        error={error}
        detailsJsx={detailsJsx}
        title={`${text.actions.deleteReelsType} ${activeReelsType?.code}?`}
      />

      <ContextMenu show={isMainMenuShow} position={position}>
        {reelsContextMenuData.map(item => (
          <ContextMenuItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            entityType={item.entityType}
            variant={item.variant}
            shortcut={item.shortcut}
            action={item.action}
            disabled={item.disabled}
          />
        ))}
      </ContextMenu>

      <ContextMenu show={isMenuShow} position={position}>
        {reelTypeContextMenuData.map(item => (
          <ContextMenuItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            entityType={item.entityType}
            variant={item.variant}
            shortcut={item.shortcut}
            action={item.action}
          />
        ))}
      </ContextMenu>

      <RibbonWrapper
        variant={'reelsType'}
        title={text.project.reelsTypes}
        count={count}
        onClickPlus={() => setNewReelsTypeModalShow(true)}
        onClickMinus={() => setDeleteModalShow(true)}
        activeItemsIds={activeReelsTypeId && [activeReelsTypeId]}
        showContextMenu={showContextMenu}
      >
        {entities?.map(entity => (
          <ReelsTypeCard
            key={entity.id}
            entity={entity}
            isSelected={activeReelsTypeId === entity.id}
            onClick={e => onReelsTypeClickHandler(e, entity.id)}
            onContextMenu={e => onReelsTypeClickHandler(e, entity.id)}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
