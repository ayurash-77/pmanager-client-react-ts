import React, { FC, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { setActiveReelsIds, setActiveReelsTypeId } from 'store/reducers/entities.reducer'
import { useTranslate } from 'hooks/useTranslate'
import { LoadingOrError } from '../../components/loadingOrError/LoadingOrError'
import { ModalWrapper } from '../../components/modal/ModalWrapper'
import { useAppSelector } from '../../hooks/redux'
import { setReelsTypeModal } from '../../store/reducers/modals.reducer'
import { useCreateReelsTypesMutation } from './reelsTypes.api'
import { IReelsTypeCreateDto, IReelsTypeInputData } from './reelsTypes.interfaces'

////////////////////////////////////////////////////////////////////////////////////////////
// New ReelsType Modal
////////////////////////////////////////////////////////////////////////////////////////////

export const ReelsTypeModal: FC = () => {
  const dispatch = useDispatch()

  const { reelsTypeModal } = useAppSelector(state => state.modals)

  const {
    reset: resetData,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IReelsTypeInputData>({ mode: 'onChange' })

  const { id } = useParams()
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const dataInit: IReelsTypeCreateDto = {
    projectId: +id,
    name: '',
    code: '',
    createdBy: user,
  }

  const [createReelsType, { isError, error, isSuccess, isLoading, reset, data: newReelType }] =
    useCreateReelsTypesMutation()

  const onCancelHandler = useCallback(() => {
    dispatch(setReelsTypeModal({ isOpen: false }))
    resetData()
    reset()
  }, [dispatch, reset, resetData])

  const onSubmitHandler = async (formData: IReelsTypeInputData) => {
    if (!formData.code || !formData.name) return
    const newData = { ...dataInit, ...formData, code: formData.code.toUpperCase() }
    await createReelsType(newData)
  }

  useEffect(() => {
    if (isSuccess && newReelType) {
      dispatch(setActiveReelsTypeId(newReelType.id))
      dispatch(setActiveReelsIds([]))
      onCancelHandler()
    }
  }, [dispatch, isSuccess, newReelType, onCancelHandler])

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
        {...reelsTypeModal}
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

export default ReelsTypeModal
