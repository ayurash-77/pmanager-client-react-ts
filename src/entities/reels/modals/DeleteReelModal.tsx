import { FC, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ErrorList } from '../../../components/errors/ErrorList'
import { InfoReelBlock } from '../../../components/info-elements/InfoReelBlock'
import ModalWrapper from '../../../components/modal/ModalWrapper'
import { useAppSelector } from '../../../hooks/redux'
import { useTranslate } from '../../../hooks/useTranslate'
import { setActiveReelsIds } from '../../../store/reducers/entities.reducer'
import { setReelModal } from '../../../store/reducers/modals.reducer'
import { useDeleteReelMutation } from '../reels.api'
import { IReel } from '../reels.interfaces'

interface IDeleteReelModal {
  item: IReel | null
}

export const DeleteReelModal: FC<IDeleteReelModal> = ({ item }) => {
  const dispatch = useDispatch()
  const { text } = useTranslate()

  const { reelModal } = useAppSelector(state => state.modals)
  const isOpen = reelModal.mode === 'delete' && reelModal.isOpen

  const [deleteReel, { error, isSuccess, reset }] = useDeleteReelMutation()
  const detailsJsx = item && <InfoReelBlock {...item} />

  const onDeleteHandler = e => {
    e.preventDefault()
    deleteReel(item.id)
  }

  const onCancelHandler = useCallback(() => {
    dispatch(setReelModal({ isOpen: false, mode: null }))
    reset()
  }, [dispatch, reset])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setReelModal({ isOpen: false, mode: null }))
      dispatch(setActiveReelsIds([]))
    }
  }, [dispatch, isSuccess])

  return (
    <ModalWrapper
      warning={true}
      type={'type1'}
      size={'md'}
      title={`WARNING! ${text.actions.deleteReel} ${item?.code}?`}
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
