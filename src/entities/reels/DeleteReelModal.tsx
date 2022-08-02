import { skipToken } from '@reduxjs/toolkit/query'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ErrorList } from '../../components/errors/ErrorList'
import { InfoReelBlock } from '../../components/info-elements/InfoReelBlock'
import ModalWrapper from '../../components/modal/ModalWrapper'
import { useAppSelector } from '../../hooks/redux'
import { useTranslate } from '../../hooks/useTranslate'
import { setActiveReelsIds } from '../../store/reducers/entities.reducer'
import { setReelModal } from '../../store/reducers/modals.reducer'
import { useDeleteReelMutation, useGetReelQuery } from './reels.api'

export const DeleteReelModal = () => {
  const dispatch = useDispatch()
  const { text } = useTranslate()

  const { reelModal } = useAppSelector(state => state.modals)
  const isOpen = reelModal.mode === 'delete' && reelModal.isOpen

  const { activeReelsIds } = useAppSelector(state => state.entities)
  const activeReelId = activeReelsIds[0]

  const { data: activeReel } = useGetReelQuery(activeReelId ?? skipToken)
  const [deleteReel, { error, isSuccess, reset }] = useDeleteReelMutation()
  const detailsJsx = activeReel && <InfoReelBlock {...activeReel} />

  const onDeleteHandler = e => {
    e.preventDefault()
    deleteReel(activeReel.id)
  }

  const onCancelHandler = useCallback(() => {
    dispatch(setReelModal({ isOpen: false, mode: 'create' }))
    reset()
  }, [dispatch, reset])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setReelModal({ isOpen: false, mode: 'create' }))
      dispatch(setActiveReelsIds([]))
    }
  }, [dispatch, isSuccess])

  return (
    <ModalWrapper
      warning={true}
      type={'type1'}
      size={'md'}
      title={`WARNING! ${text.actions.deleteReel} ${activeReel?.code}?`}
      onSubmitHandler={onDeleteHandler}
      onCancelHandler={onCancelHandler}
      isOpen={isOpen}
    >
      <div className={'flex'}>
        {detailsJsx}
        <ErrorList error={error} />
      </div>
    </ModalWrapper>
  )
}
