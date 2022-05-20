import { useTranslate } from '../../hooks/useTranslate'
import { RibbonWrapper } from './RibbonWrapper'
import { IReel } from '../../interfaces/IReel'
import { EntityCardReel } from '../entity-card/EntityCardReel'
import { useEffect, useState } from 'react'
import { IProject } from '../../interfaces/IProject'
import NewReelModal from '../../modal/NewReelModal'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  setActiveReelId,
  setActiveReelsIds,
  setActiveReelsTypeId,
  setActiveShotId,
} from '../../store/reducers/entities.reducer'
import { useDeleteReelMutation } from '../../store/api/reels.api'
import { ErrorList } from '../errors/ErrorList'
import DeleteModal from '../../modal/DeleteModal'
import { InfoReelBlock } from '../info-elements/InfoReelBlock'
import { useNavigate } from 'react-router-dom'
import { setActiveMenu } from '../../store/reducers/ui.reducer'

export const RibbonReels = ({ entities, project }: { entities: IReel[]; project: IProject }) => {
  const { text } = useTranslate()
  const dispatch = useAppDispatch()
  const count = entities?.length

  const [deleteReel, { error, isSuccess, reset }] = useDeleteReelMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const { activeReelsIds } = useAppSelector(state => state.entities)

  const [isNewReelModalShow, setNewReelModalShow] = useState(false)
  const [isDeleteModalShow, setDeleteModalShow] = useState(false)

  const onClickItemHandler = id => {
    // dispatch(setActiveReelId(activeReelId === id ? null : id))
    dispatch(setActiveReelsIds(activeReelsIds.length === 1 && activeReelsIds[0] === id ? [] : [id]))
    dispatch(setActiveShotId(null))
    dispatch(setActiveReelsTypeId(null))
  }

  const activeReel = entities?.find(entity => activeReelsIds.includes(entity.id)) || null
  const detailsJsx = activeReel && <InfoReelBlock {...activeReel} />

  const navigate = useNavigate()

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
        activeItemsIds={activeReelsIds}
      >
        {entities?.map(entity => (
          <EntityCardReel
            key={entity.id}
            reel={entity}
            isSelected={activeReelsIds.includes(entity.id)}
            onClick={() => onClickItemHandler(entity.id)}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
