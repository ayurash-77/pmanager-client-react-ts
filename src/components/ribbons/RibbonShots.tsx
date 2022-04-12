import { useTranslate } from '../../hooks/useTranslate'
import { RibbonWrapper } from './RibbonWrapper'
import { IShot } from '../../interfaces/IShot'
import { EntityCardShot } from '../entity-card/EntityCardShot'
import { useEffect, useState } from 'react'
import { IProject } from '../../interfaces/IProject'
import NewShotModal from '../../modal/NewShotModal'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setActiveReelId, setActiveReelsTypeId, setActiveShotId } from '../../store/reducers/entities.reducer'
import { useDeleteShotMutation } from '../../store/api/shots.api'
import DeleteModal from '../../modal/DeleteModal'
import { ErrorList } from '../errors/ErrorList'
import { InfoShotBlock } from '../info-elements/InfoShotBlock'
import { useDeleteShot } from '../../hooks/useDeleteShot'

export const RibbonShots = ({ entities, project }: { entities: IShot[]; project: IProject }) => {
  const { text } = useTranslate()
  const dispatch = useAppDispatch()
  const count = entities?.length

  const { activeShotId } = useAppSelector(state => state.entities)

  const [isNewShotModalShow, setNewShotModalShow] = useState(false)

  const onClickItemHandler = id => {
    dispatch(setActiveShotId(activeShotId === id ? null : id))
    dispatch(setActiveReelsTypeId(null))
    dispatch(setActiveReelId(null))
  }

  const activeShot = entities?.find(entity => entity.id === activeShotId) || null

  const {
    isDeleteModalShow,
    setDeleteModalShow,
    canDeleteItem,
    cancelDeleteShotHandler,
    deleteShotHandler,
    errorJsx,
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
        errorJsx={errorJsx}
        detailsJsx={activeShot && <InfoShotBlock {...activeShot} />}
        title={title}
      />
      <RibbonWrapper
        variant={'shot'}
        title={text.project.shots}
        count={count}
        onClickPlus={() => setNewShotModalShow(true)}
        onClickMinus={() => setDeleteModalShow(true)}
        activeItemId={activeShotId}
        disableActiveItem={() => dispatch(setActiveShotId(null))}
      >
        {entities?.map(entity => (
          <EntityCardShot
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
