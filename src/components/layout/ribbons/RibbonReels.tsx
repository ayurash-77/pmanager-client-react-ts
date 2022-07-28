import { IProject } from 'entities/projects/projects.interfaces'
import NewReelModal from 'entities/reels/NewReelModal'
import { ReelCard } from 'entities/reels/ReelCard'
import { useDeleteReelMutation } from 'entities/reels/reels.api'
import { IReel } from 'entities/reels/reels.interfaces'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as CommonIcons from 'assets/icons/common-icons'
import * as ToolbarIcons from 'assets/icons/toolbar-icons'
import { setActiveReelsIds } from 'store/reducers/entities.reducer'
import { useAppSelector } from 'hooks/redux'
import { useOnReelClick } from 'hooks/useOnReelClick'
import { useTranslate } from 'hooks/useTranslate'
import { InfoReelBlock } from 'components/info-elements/InfoReelBlock'
import DeleteModal from 'components/modal/DeleteModal'
import { ContextMenu } from 'components/ui/ContextMenu/ContextMenu'
import { ContextMenuItem, IContextMenuItem } from 'components/ui/ContextMenu/ContextMenuItem'
import { useContextMenu } from '../../../hooks/useContextMenu'
import { usePermissions } from '../../../hooks/usePermissions'
import { setNewReelModalShow } from '../../../store/reducers/modals.reducer'
import { RibbonWrapper } from './RibbonWrapper'

export const RibbonReels = ({ entities, project }: { entities: IReel[]; project: IProject }) => {
  const { text } = useTranslate()

  // const dispatch = useAppDispatch()
  const dispatch = useDispatch()
  const count: number = entities?.length || 0

  const [deleteReel, { error, isSuccess, reset }] = useDeleteReelMutation()

  const { activeReelsIds } = useAppSelector(state => state.entities)

  const [isDeleteModalShow, setDeleteModalShow] = useState(false)

  const activeReel = entities?.find(entity => activeReelsIds.includes(entity.id)) || null
  const detailsJsx = activeReel && <InfoReelBlock {...activeReel} />

  const { newReelModalShow } = useAppSelector(state => state.modals)
  const { canCreateProject, canEditProject, canDeleteProject } = usePermissions()
  const { position, isMenuShow: isMainMenuShow, showContextMenu } = useContextMenu()
  const { onReelClickHandler, isMenuShow } = useOnReelClick()

  const reelsContextMenuData: IContextMenuItem[] = [
    {
      title: 'New Reel',
      icon: <CommonIcons.Plus />,
      entityType: 'reel',
      shortcut: 'Ctrl+N',
      action: () => dispatch(setNewReelModalShow(true)),
      disabled: !canCreateProject,
    },
  ]

  const reelContextMenuData: IContextMenuItem[] = [
    {
      title: 'New Reels',
      icon: <CommonIcons.Plus />,
      entityType: 'reel',
      shortcut: 'Ctrl+N',
      action: () => dispatch(setNewReelModalShow(true)),
    },
    {
      title: 'Add existing Shot',
      icon: <CommonIcons.Plus />,
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
      icon: <CommonIcons.Trash />,
      variant: 'accent',
      shortcut: 'Ctrl+Del',
      action: () => setDeleteModalShow(true),
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
      <NewReelModal isOpen={newReelModalShow} />
      <DeleteModal
        isOpen={isDeleteModalShow}
        closeAction={onCancelHandler}
        deleteItem={activeReel}
        deleteAction={onDeleteHandler}
        error={error}
        detailsJsx={detailsJsx}
        title={`${text.actions.deleteReel} ${activeReel?.code}?`}
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
          />
        ))}
      </ContextMenu>

      <ContextMenu show={isMenuShow} position={position}>
        {reelContextMenuData.map(item => (
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
        variant={'reel'}
        title={text.project.reels}
        count={count}
        onClickPlus={() => dispatch(setNewReelModalShow(true))}
        onClickMinus={() => setDeleteModalShow(true)}
        activeItemsIds={activeReelsIds}
        showContextMenu={showContextMenu}
      >
        {entities?.map(entity => (
          <ReelCard
            key={entity.id}
            reel={entity}
            isSelected={activeReelsIds.includes(entity.id)}
            onClick={e => onReelClickHandler(e, entity.id)}
            onContextMenu={e => onReelClickHandler(e, entity.id)}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
