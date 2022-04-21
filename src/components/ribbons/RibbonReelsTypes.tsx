import { useTranslate } from '../../hooks/useTranslate'
import { IReelsType } from '../../interfaces/IReelsType'
import { EntityCardReelsType } from '../entity-card/EntityCardReelsType'
import { RibbonWrapper } from './RibbonWrapper'
import { useEffect, useState } from 'react'
import NewReelsTypeModal from '../../modal/NewReelsTypeModal'
import { IProject } from '../../interfaces/IProject'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setActiveReelId, setActiveReelsTypeId, setActiveShotId } from '../../store/reducers/entities.reducer'
import { useDeleteReelsTypeMutation } from '../../store/api/reelsTypes.api'
import { ErrorList } from '../errors/ErrorList'
import DeleteModal from '../../modal/DeleteModal'
import { InfoReelsTypeBlock } from '../info-elements/InfoReelsTypeBlock'

export const RibbonReelsTypes = ({ entities, project }: { entities: IReelsType[]; project: IProject }) => {
  const { text } = useTranslate()
  const count = entities?.length

  const [deleteReelsType, { error, isSuccess, reset }] = useDeleteReelsTypeMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const { activeReelsTypeId } = useAppSelector(state => state.entities)
  const dispatch = useAppDispatch()

  const [isNewReelsTypeModalShow, setNewReelsTypeModalShow] = useState(false)
  const [isDeleteModalShow, setDeleteModalShow] = useState(false)

  const onClickItemHandler = id => {
    dispatch(setActiveReelsTypeId(activeReelsTypeId === id ? null : id))
    dispatch(setActiveReelId(null))
    dispatch(setActiveShotId(null))
  }

  const activeReelsType = entities?.find(entity => entity.id === activeReelsTypeId) || null
  const detailsJsx = activeReelsType && <InfoReelsTypeBlock {...activeReelsType} />

  const onDeleteHandler = e => {
    e.preventDefault()
    deleteReelsType(activeReelsTypeId)
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
      <NewReelsTypeModal
        isOpen={isNewReelsTypeModalShow}
        closeAction={() => setNewReelsTypeModalShow(false)}
        project={project}
      />
      <DeleteModal
        isOpen={isDeleteModalShow}
        closeAction={onCancelHandler}
        deleteItem={activeReelsType}
        deleteAction={onDeleteHandler}
        errorJsx={errorJsx}
        detailsJsx={detailsJsx}
        title={`${text.actions.deleteReel} ${activeReelsType?.code}?`}
      />
      <RibbonWrapper
        variant={'reelsType'}
        title={text.project.reelsTypes}
        count={count}
        onClickPlus={() => setNewReelsTypeModalShow(true)}
        onClickMinus={() => setDeleteModalShow(true)}
        activeItemsIds={[activeReelsTypeId]}
      >
        {entities?.map(entity => (
          <EntityCardReelsType
            key={entity.id}
            entity={entity}
            isSelected={activeReelsTypeId === entity.id}
            onClick={() => onClickItemHandler(entity.id)}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
