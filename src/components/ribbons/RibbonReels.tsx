import { useTranslate } from '../../hooks/useTranslate'
import { RibbonWrapper } from './RibbonWrapper'
import { IReel } from '../../interfaces/IReel'
import { EntityCardReel } from '../entity-card/EntityCardReel'
import { useEffect, useState } from 'react'
import { IProject } from '../../interfaces/IProject'
import NewReelModal from '../../modal/NewReelModal'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setActiveReelId, setActiveReelsTypeId, setActiveShotId } from '../../store/reducers/entities.reducer'
import { useDeleteReelMutation } from '../../store/api/reels.api'
import { ErrorList } from '../errors/ErrorList'
import DeleteModal from '../../modal/DeleteModal'
import { InfoReelBlock } from '../info-elements/InfoReelBlock'

export const RibbonReels = ({ entities, project }: { entities: IReel[]; project: IProject }) => {
  const { text } = useTranslate()
  const count = entities?.length

  const [deleteReel, { error, isSuccess, reset }] = useDeleteReelMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const { activeReelId } = useAppSelector(state => state.entities)
  const dispatch = useAppDispatch()

  const [isNewReelModalShow, setNewReelModalShow] = useState(false)
  const [isDeleteModalShow, setDeleteModalShow] = useState(false)

  const onClickItemHandler = id => {
    dispatch(setActiveReelId(activeReelId === id ? null : id))
    dispatch(setActiveReelsTypeId(null))
    dispatch(setActiveShotId(null))
  }

  const activeReel = entities?.find(entity => entity.id === activeReelId) || null
  const detailsJsx = activeReel && <InfoReelBlock {...activeReel} />

  const onDeleteHandler = e => {
    e.preventDefault()
    deleteReel(activeReelId)
  }

  const onCancelHandler = () => {
    reset()
    setDeleteModalShow(false)
  }

  useEffect(() => {
    if (isSuccess) {
      setDeleteModalShow(false)
      dispatch(setActiveReelId(null))
    }
  }, [dispatch, isSuccess])

  return (
    <>
      <NewReelModal
        isOpen={isNewReelModalShow}
        closeAction={() => setNewReelModalShow(false)}
        project={project}
      />
      <DeleteModal
        isOpen={isDeleteModalShow}
        closeAction={onCancelHandler}
        deleteItem={activeReel}
        deleteAction={onDeleteHandler}
        errorJsx={errorJsx}
        detailsJsx={detailsJsx}
        title={`${text.actions.deleteReel} ${activeReel?.code}?`}
      />
      <RibbonWrapper
        variant={'reel'}
        title={text.project.reels}
        count={count}
        onClickPlus={() => setNewReelModalShow(true)}
        onClickMinus={() => setDeleteModalShow(true)}
        activeItemId={activeReelId}
        disableActiveItem={() => dispatch(setActiveReelId(null))}
      >
        {entities?.map(entity => (
          <EntityCardReel
            key={entity.id}
            entity={entity}
            isSelected={activeReelId === entity.id}
            onClick={() => onClickItemHandler(entity.id)}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
