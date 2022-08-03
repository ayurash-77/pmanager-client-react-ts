import { skipToken } from '@reduxjs/toolkit/query'
import React, { FC, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { setActiveReelsIds, setActiveReelsTypeId } from 'store/reducers/entities.reducer'
import { useTranslate } from 'hooks/useTranslate'
import { LoadingOrError } from '../../../components/loadingOrError/LoadingOrError'
import { ModalWrapper } from '../../../components/modal/ModalWrapper'
import { useAppSelector } from '../../../hooks/redux'
import { setReelsTypeModal } from '../../../store/reducers/modals.reducer'
import { useGetReelsQuery } from '../../reels/reels.api'
import { useUpdateReelsTypesMutation } from '../reelsTypes.api'
import { IReelsType, IReelsTypeInputData } from '../reelsTypes.interfaces'

////////////////////////////////////////////////////////////////////////////////////////////
// New ReelsType Modal
////////////////////////////////////////////////////////////////////////////////////////////
interface IEditReelsTypeModal {
  item: IReelsType
}

export const EditReelsTypeModal: FC<IEditReelsTypeModal> = ({ item: reelsType }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { text } = useTranslate()

  const { reelsTypeModal } = useAppSelector(state => state.modals)
  const isOpen = reelsType && reelsTypeModal.mode === 'edit' && reelsTypeModal.isOpen

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IReelsTypeInputData>({ mode: 'onChange' })

  const [createReelsType, { isError, error, isSuccess, isLoading, reset, data: updatedReelType }] =
    useUpdateReelsTypesMutation()

  const { refetch: refetchReels } = useGetReelsQuery(+id ?? skipToken)

  const onCancelHandler = useCallback(() => {
    dispatch(setReelsTypeModal({ isOpen: false, mode: null }))
    // resetFormData()
    reset()
  }, [dispatch, reset])

  const onSubmitHandler = async (formData: IReelsTypeInputData) => {
    if (!formData.code || !formData.name) return
    const newData = { ...reelsType, ...formData, code: formData.code.toUpperCase() }
    await createReelsType(newData)
  }

  useEffect(() => {
    setValue('name', reelsType.name)
    setValue('code', reelsType.code)
  }, [reelsType, setValue])

  useEffect(() => {
    if (isSuccess && updatedReelType) {
      dispatch(setActiveReelsTypeId(updatedReelType.id))
      dispatch(setActiveReelsIds([]))
      // refetchReels()
      onCancelHandler()
    }
  }, [dispatch, isSuccess, updatedReelType, onCancelHandler, refetchReels])

  ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        warning={false}
        type={'type2'}
        size={'sm'}
        title={text.actions.addReelsType}
        onSubmitHandler={handleSubmit(onSubmitHandler)}
        onCancelHandler={onCancelHandler}
        isValid={isValid}
        isOpen={isOpen}
      >
        <div className={'grid grid-cols-2 justify-end items-center gap-1'}>
          <label>{text.reelsTypes.code}:</label>
          <input
            className={'uppercase'}
            minLength={3}
            maxLength={4}
            size={7}
            autoFocus={true}
            {...register('code', { required: text.error.isRequired })}
          />
          {errors?.code && <div className={'errorField'}>{text.error.fieldRequired}</div>}

          <label className={'flex justify-end'}>{text.reelsTypes.name}:</label>
          <input size={7} {...register('name', { required: text.error.isRequired })} />
          {errors?.name && <div className={'errorField'}>{text.error.fieldRequired}</div>}
        </div>
        <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
      </ModalWrapper>
    </>
  )
}
