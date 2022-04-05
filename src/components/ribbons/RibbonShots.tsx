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

export const RibbonShots = ({ entities, project }: { entities: IShot[]; project: IProject }) => {
  const { text } = useTranslate()
  const count = entities?.length

  const [deleteShot, { error, isSuccess, reset }] = useDeleteShotMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const { activeShotId } = useAppSelector(state => state.entities)
  const dispatch = useAppDispatch()

  const [isNewShotModalShow, setNewShotModalShow] = useState(false)
  const [isDeleteModalShow, setDeleteModalShow] = useState(false)

  const onClickItemHandler = id => {
    dispatch(setActiveShotId(activeShotId === id ? null : id))
    dispatch(setActiveReelsTypeId(null))
    dispatch(setActiveReelId(null))
  }

  const activeShot = entities?.find(entity => entity.id === activeShotId) || null
  const detailsJsx = activeShot && <InfoShotBlock {...activeShot} />

  const onDeleteHandler = e => {
    e.preventDefault()
    deleteShot(activeShotId)
  }

  const onCancelHandler = () => {
    reset()
    setDeleteModalShow(false)
  }

  useEffect(() => {
    if (isSuccess) {
      setDeleteModalShow(false)
      dispatch(setActiveShotId(null))
    }
  }, [dispatch, isSuccess])

  return (
    <>
      <NewShotModal
        isOpen={isNewShotModalShow}
        closeAction={() => setNewShotModalShow(false)}
        project={project}
      />
      <DeleteModal
        isOpen={isDeleteModalShow}
        closeAction={onCancelHandler}
        deleteItem={activeShot}
        deleteAction={onDeleteHandler}
        errorJsx={errorJsx}
        detailsJsx={detailsJsx}
        title={`${text.actions.deleteShot} ${activeShot?.code}?`}
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
