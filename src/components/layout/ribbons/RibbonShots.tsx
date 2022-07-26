import { useState } from 'react'
import { IProject } from '../../../entities/projects/projects.interfaces'
import NewShotModal from '../../../entities/shots/NewShotModal'
import { ShotCard } from '../../../entities/shots/ShotCard'
import { IShot } from '../../../entities/shots/shots.interfaces'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useDeleteShot } from '../../../hooks/useDeleteShot'
import { useTranslate } from '../../../hooks/useTranslate'
import {
  setActiveReelsIds,
  setActiveReelsTypeId,
  setActiveShotId,
} from '../../../store/reducers/entities.reducer'
import { InfoShotBlock } from '../../info-elements/InfoShotBlock'
import DeleteModal from '../../modal/DeleteModal'
import { RibbonWrapper } from './RibbonWrapper'

export const RibbonShots = ({ entities, project }: { entities: IShot[]; project: IProject }) => {
  const { text } = useTranslate()
  const dispatch = useAppDispatch()
  const count = entities?.length

  const { activeShotId } = useAppSelector(state => state.entities)

  const [isNewShotModalShow, setNewShotModalShow] = useState(false)

  const onClickItemHandler = id => {
    dispatch(setActiveShotId(activeShotId === id ? null : id))
    dispatch(setActiveReelsTypeId(null))
    dispatch(setActiveReelsIds([]))
  }

  const activeShot = entities?.find(entity => entity.id === activeShotId) || null

  const {
    isDeleteModalShow,
    setDeleteModalShow,
    canDeleteItem,
    cancelDeleteShotHandler,
    deleteShotHandler,
    error,
    title,
  } = useDeleteShot(project, activeShot)

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <NewShotModal
        project={project}
        isOpen={isNewShotModalShow}
        closeAction={() => setNewShotModalShow(false)}
        shots={entities}
      />
      <DeleteModal
        isOpen={isDeleteModalShow}
        closeAction={cancelDeleteShotHandler}
        deleteItem={activeShot}
        deleteAction={deleteShotHandler}
        error={error}
        detailsJsx={activeShot && <InfoShotBlock {...activeShot} />}
        title={title}
      />
      <RibbonWrapper
        variant={'shot'}
        title={text.project.shots}
        count={count}
        onClickPlus={() => setNewShotModalShow(true)}
        onClickMinus={() => setDeleteModalShow(true)}
        activeItemsIds={[activeShotId]}
      >
        {entities?.map(entity => (
          <ShotCard
            key={entity.id}
            entity={entity}
            isSelected={activeShotId === entity.id}
            onClick={() => onClickItemHandler(entity.id)}
            disabled={entity.reels?.length === 0}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
