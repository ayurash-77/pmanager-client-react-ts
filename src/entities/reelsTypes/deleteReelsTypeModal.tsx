import { FC, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ErrorList } from '../../components/errors/ErrorList'
import { InfoReelsTypeBlock } from '../../components/info-elements/InfoReelsTypeBlock'
import ModalWrapper from '../../components/modal/ModalWrapper'
import { useAppSelector } from '../../hooks/redux'
import { useTranslate } from '../../hooks/useTranslate'
import { setActiveReelsTypeId } from '../../store/reducers/entities.reducer'
import { setReelsTypeModal } from '../../store/reducers/modals.reducer'
import { useDeleteReelsTypeMutation } from './reelsTypes.api'
import { IReelsType } from './reelsTypes.interfaces'

interface IDeleteReelsTypeModal {
  item: IReelsType | null
}

export const DeleteReelsTypeModal: FC<IDeleteReelsTypeModal> = ({ item }) => {
  const dispatch = useDispatch()
  const { text } = useTranslate()

  const { reelsTypeModal } = useAppSelector(state => state.modals)
  const isOpen = reelsTypeModal.mode === 'delete' && reelsTypeModal.isOpen
  const { activeReelsTypeId } = useAppSelector(state => state.entities)

  const [deleteReelsType, { error, isSuccess, reset }] = useDeleteReelsTypeMutation()
  const detailsJsx = item && <InfoReelsTypeBlock {...item} />

  const onDeleteHandler = e => {
    e.preventDefault()
    deleteReelsType(activeReelsTypeId)
  }

  const onCancelHandler = useCallback(() => {
    dispatch(setReelsTypeModal({ isOpen: false, mode: null }))
    reset()
  }, [dispatch, reset])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setReelsTypeModal({ isOpen: false, mode: null }))
      dispatch(setActiveReelsTypeId(null))
    }
  }, [dispatch, isSuccess])

  return (
    <ModalWrapper
      warning={true}
      type={'type1'}
      size={'md'}
      title={`WARNING! ${text.actions.deleteReelsType} ${item?.code}?`}
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
