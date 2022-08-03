import React, { FC, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { LoadingOrError } from '../../../components/loadingOrError/LoadingOrError'
import ModalWrapper from '../../../components/modal/ModalWrapper'
import { useAppSelector } from '../../../hooks/redux'
import { useTranslate } from '../../../hooks/useTranslate'
import { setActiveReelsIds, setActiveReelsTypeId } from '../../../store/reducers/entities.reducer'
import { setReelsTypeModal } from '../../../store/reducers/modals.reducer'
import { useCreateReelsTypesMutation, useUpdateReelsTypesMutation } from '../../reelsTypes/reelsTypes.api'
import { IReelsType, IReelsTypeCreateDto, IReelsTypeInputData } from '../../reelsTypes/reelsTypes.interfaces'

interface IReelsTypeForm {
  title: string
  isOpen: boolean
  reelsType?: IReelsType
}

export const ReelsTypeForm: FC<IReelsTypeForm> = props => {
  const { title, isOpen, reelsType } = props
  const dispatch = useDispatch()
  const { id } = useParams()
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const {
    reset: resetFormData,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<IReelsTypeInputData>({ mode: 'onChange' })

  const [
    createReelsType,
    {
      isError: isErrorNewItem,
      error: errorNewItem,
      isSuccess: isSuccessNewItem,
      isLoading: isLoadingNewItem,
      reset: resetNewItem,
      data: newReelType,
    },
  ] = useCreateReelsTypesMutation()

  const [
    updateReelsType,
    {
      isError: isErrorUpdate,
      error: errorUpdate,
      isSuccess: isSuccessUpdate,
      isLoading: isLoadingUpdate,
      data: updatedReelType,
    },
  ] = useUpdateReelsTypesMutation()

  const dataInit: IReelsTypeCreateDto = {
    projectId: +id,
    name: '',
    code: '',
    createdBy: user,
  }

  const onNewItemSubmitHandler = async (formData: IReelsTypeInputData) => {
    if (!formData.code || !formData.name) return
    const newData = { ...dataInit, ...formData, code: formData.code.toUpperCase() }
    await createReelsType(newData)
  }

  const onUpdateSubmitHandler = async (formData: IReelsTypeInputData) => {
    if (!formData.code || !formData.name) return
    const newData = { ...reelsType, ...formData, code: formData.code.toUpperCase() }
    await updateReelsType(newData)
  }

  const onCancelHandler = useCallback(() => {
    dispatch(setReelsTypeModal({ isOpen: false, mode: null }))
    resetFormData()
    resetNewItem()
  }, [dispatch, resetFormData, resetNewItem])

  const reelsTypeName = reelsType ? reelsType.name : watch('code')

  useEffect(() => {
    reelsType && setValue('code', reelsType.code)
    setValue('name', reelsTypeName)
  }, [reelsType, reelsTypeName, setValue])

  useEffect(() => {
    if (isSuccessNewItem && newReelType) {
      dispatch(setActiveReelsTypeId(newReelType.id))
      dispatch(setActiveReelsIds([]))
      onCancelHandler()
    }
    if (isSuccessUpdate && updatedReelType) {
      dispatch(setActiveReelsTypeId(updatedReelType.id))
      dispatch(setActiveReelsIds([]))
      onCancelHandler()
    }
  }, [dispatch, isSuccessNewItem, isSuccessUpdate, newReelType, onCancelHandler, updatedReelType])

  return (
    <>
      <ModalWrapper
        warning={false}
        type={'type2'}
        size={'sm'}
        title={title}
        onSubmitHandler={handleSubmit(reelsType ? onUpdateSubmitHandler : onNewItemSubmitHandler)}
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
        <LoadingOrError isLoading={isLoadingNewItem} isError={isErrorNewItem} error={errorNewItem} />
        <LoadingOrError isLoading={isLoadingUpdate} isError={isErrorUpdate} error={errorUpdate} />
      </ModalWrapper>
    </>
  )
}
