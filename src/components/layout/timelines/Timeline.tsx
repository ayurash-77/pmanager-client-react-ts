import { skipToken } from '@reduxjs/toolkit/query'
import cn from 'classnames'
import { useGetReelQuery, useGetReelsQuery, useUpdateReelMutation } from 'entities/reels/reels.api'
import { AddShotToReelModal } from 'entities/shots/AddShotToReelModal'
import { ShotCard } from 'entities/shots/ShotCard'
import { useOnShotClick } from 'entities/shots/useOnShotClick'
import { Reorder } from 'framer-motion'
import { FC, useEffect, useMemo, useState } from 'react'
import { CommonIcons } from 'assets/icons/common-icons'
import * as ToolbarIcons from 'assets/icons/toolbar-icons'
import {
  setActiveReelsIds,
  setActiveReelsTypeId,
  setActiveShotId,
  setDragShotId,
} from 'store/reducers/entities.reducer'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { IconButton } from 'components/ui'
import { ContextMenu } from 'components/ui/ContextMenu/ContextMenu'
import { IContextMenuItem } from 'components/ui/ContextMenu/ContextMenuItem'
import css from './Timeline.module.scss'
import { ITimeline } from './timeline.interfaces'

////////////////////////////////////////////////////////////////////////////////////////////
// Timeline
////////////////////////////////////////////////////////////////////////////////////////////

export const Timeline: FC<ITimeline> = ({ reelInit }) => {
  const dispatch = useAppDispatch()

  const { activeReelsIds, activeShotId, activeProjectId } = useAppSelector(state => state.entities)

  const { refetch: refetchReels } = useGetReelsQuery(activeProjectId ?? skipToken)
  const { data: reel = { ...reelInit } } = useGetReelQuery(reelInit.id ?? skipToken)
  const [updateReel] = useUpdateReelMutation()

  const shotInReel = reel?.shotsIds.includes(activeShotId)

  const onTitleClickHandler = id => {
    dispatch(setActiveReelsIds(activeReelsIds.length === 1 && activeReelsIds[0] === id ? [] : [id]))
    dispatch(setActiveShotId(null))
    dispatch(setActiveReelsTypeId(null))
  }

  const [shotsIds, setShotsIds] = useState(reel?.shotsIds)
  const [isAddShotModalShow, setAddShotModalShow] = useState(false)

  const { onShotClickHandler, position, isMenuShow } = useOnShotClick()

  const shotContextMenuData: IContextMenuItem[] = useMemo(
    () => [
      {
        title: 'New Shot',
        icon: CommonIcons.plus(),
        entityType: 'reel',
        shortcut: 'Ctrl+N',
        action: () => alert('New Shot'),
      },
      {
        title: 'Edit Shot',
        icon: <ToolbarIcons.Gear />,
        shortcut: 'Ctrl+E',
        action: () => alert('Edit Shot'),
      },
      {
        title: 'Delete Shot',
        icon: CommonIcons.trash(),
        variant: 'accent',
        shortcut: 'Ctrl+Del',
        action: () => alert('Delete Shot'),
      },
    ],
    []
  )

  const onReorderHandler = ids => {
    dispatch(setActiveReelsIds([reel.id]))
    setShotsIds(ids)
  }

  const onDragEndHandler = async () => {
    await updateReel({ ...reel, shotsIds: shotsIds })
    dispatch(setDragShotId(null))
  }
  const onDragStartHandler = shotId => {
    dispatch(setDragShotId(shotId))
    dispatch(setActiveShotId(shotId))
  }

  const removeShotFromReelHandler = async () => {
    if (!activeShotId) return
    const newShots = reel.shots.filter(shot => shot.id !== activeShotId)
    const newShotsIds = reel.shotsIds.filter(id => id !== activeShotId)
    await updateReel({ ...reel, shots: newShots, shotsIds: newShotsIds })
    dispatch(setActiveShotId(null))
    dispatch(setActiveReelsIds([reel.id]))
    setShotsIds(newShotsIds)
  }

  const addShotToReelHandler = () => {
    dispatch(setActiveReelsIds([reel.id]))
    setAddShotModalShow(true)
  }

  useEffect(() => {
    setShotsIds(reel.shotsIds)
    refetchReels()
  }, [reel, refetchReels])

  // RENDER
  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <AddShotToReelModal
        isOpen={isAddShotModalShow}
        reel={reel}
        closeAction={() => setAddShotModalShow(false)}
      />
      <ContextMenu show={isMenuShow} position={position} data={shotContextMenuData} />

      <div className={css.container}>
        <div
          className={cn(css.code, activeReelsIds.includes(reel.id) && css.active)}
          onClick={() => onTitleClickHandler(reel.id)}
        >
          {reel.highPriority && <span className="highPriority" />}
          {reel.code}
          {reel.name?.length > 0 && <div className={css.name}> - {reel.name}</div>}
          <div className={css.shotsCount}>
            - {reel.shots.length} shot{reel.shots.length !== 1 && 's'}
          </div>
        </div>

        <div className={css.timelineRow}>
          <div className={css.timelineItemsRow}>
            <div className={cn(css.timelineItems, activeReelsIds.includes(reel.id) && css.active)}>
              <Reorder.Group
                as={'div'}
                axis={'x'}
                values={shotsIds}
                onReorder={onReorderHandler}
                style={{ display: 'flex', gap: 4 }}
              >
                {shotsIds.map(shotId => (
                  <Reorder.Item
                    key={shotId}
                    value={shotId}
                    whileDrag={{ scale: 0.9, cursor: 'grabbing', boxShadow: '0 4px 8px #00000060' }}
                    onDragEnd={onDragEndHandler}
                    onDragStart={() => onDragStartHandler(shotId)}
                    onClick={e => onShotClickHandler(e, shotId)}
                    onContextMenu={e => onShotClickHandler(e, shotId)}
                  >
                    <ShotCard
                      entity={reel.shots.find(shot => shot.id === shotId)}
                      isSelected={activeShotId === shotId}
                      draggable={true}
                    />
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          </div>
          <div className={css.timelineItemsButtons}>
            <IconButton size={13} icon={CommonIcons.plus()} onClick={addShotToReelHandler} />
            <IconButton
              size={13}
              icon={CommonIcons.minus()}
              disabled={!shotInReel}
              variant={'accent'}
              onClick={removeShotFromReelHandler}
            />
          </div>
        </div>
      </div>
    </>
  )
}
