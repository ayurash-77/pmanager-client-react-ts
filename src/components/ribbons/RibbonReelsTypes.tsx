import { skipToken } from '@reduxjs/toolkit/query'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useOnShotClickHandler } from '../../hooks/useOnClickHandlers'
import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
import { IReelsType } from '../../interfaces/IReelsType'
import DeleteModal from '../../modal/DeleteModal'
import NewReelsTypeModal from '../../modal/NewReelsTypeModal'
import { useGetReelsQuery } from '../../store/api/reels.api'
import { useDeleteReelsTypeMutation } from '../../store/api/reelsTypes.api'
import { setActiveReelsTypeId } from '../../store/reducers/entities.reducer'
import { EntityCardReelsType } from '../entity-card/EntityCardReelsType'
import { InfoReelsTypeBlock } from '../info-elements/InfoReelsTypeBlock'
import { RibbonWrapper } from './RibbonWrapper'

export const RibbonReelsTypes = ({ entities, project }: { entities: IReelsType[]; project: IProject }) => {
  const { text } = useTranslate()
  const count: number = entities?.length || 0

  const [deleteReelsType, { error, isSuccess, reset }] = useDeleteReelsTypeMutation()
  const { refetch: refetchReels } = useGetReelsQuery(project?.id ?? skipToken)

  const { activeReelsTypeId } = useAppSelector(state => state.entities)
  const dispatch = useAppDispatch()
  const { onReelsTypeClickHandler } = useOnShotClickHandler()

  const [isNewReelsTypeModalShow, setNewReelsTypeModalShow] = useState(false)
  const [isDeleteModalShow, setDeleteModalShow] = useState(false)

  const activeReelsType = entities?.find(entity => entity.id === activeReelsTypeId) || null
  const detailsJsx = activeReelsType && <InfoReelsTypeBlock {...activeReelsType} />

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
        isOpen={isNewReelsTypeModalShow}
        closeAction={() => setNewReelsTypeModalShow(false)}
        project={project}
      />
      <DeleteModal
        isOpen={isDeleteModalShow}
        closeAction={onCancelHandler}
        deleteItem={activeReelsType}
        deleteAction={onDeleteHandler}
        error={error}
        detailsJsx={detailsJsx}
        title={`${text.actions.deleteReel} ${activeReelsType?.code}?`}
      />
      <RibbonWrapper
        variant={'reelsType'}
        title={text.project.reelsTypes}
        count={count}
        onClickPlus={() => setNewReelsTypeModalShow(true)}
        onClickMinus={() => setDeleteModalShow(true)}
        activeItemsIds={activeReelsTypeId && [activeReelsTypeId]}
      >
        {entities?.map(entity => (
          <EntityCardReelsType
            key={entity.id}
            entity={entity}
            isSelected={activeReelsTypeId === entity.id}
            onClick={() => onReelsTypeClickHandler(entity.id)}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
