import React, { FC, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { LoadingOrError } from '../../../components/loadingOrError/LoadingOrError'
import ModalWrapper from '../../../components/modal/ModalWrapper'
import { IMode } from '../../../components/modal/modalWrapper.interfaces'
import { useAppSelector } from '../../../hooks/redux'
import { useTranslate } from '../../../hooks/useTranslate'
import { setActiveReelsIds, setActiveReelsTypeId } from '../../../store/reducers/entities.reducer'
import { setReelsTypeModal } from '../../../store/reducers/modals.reducer'
import { useCreateReelsTypesMutation, useUpdateReelsTypesMutation } from '../reelsTypes.api'
import { IReelsType, IReelsTypeCreateDto, IReelsTypeInputData } from '../reelsTypes.interfaces'

interface ReelsTypeModal {
  mode: IMode
  reelsType?: IReelsType
}

export const ReelsTypeModal: FC<ReelsTypeModal> = ({ reelsType, mode }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const { reelsTypeModal } = useAppSelector(state => state.modals)
  const title = mode === 'create' ? text.actions.addReelsType : text.actions.editReelsType
  const isOpen = reelsTypeModal.mode === mode && reelsTypeModal.isOpen

  const [
    createReelsType,
    {
      isError: isErrorNewEntity,
      error: errorNewEntity,
      isSuccess: isSuccessNewEntity,
      isLoading: isLoadingNewEntity,
      reset: resetNewEntity,
      data: newEntity,
    },
  ] = useCreateReelsTypesMutation()

  const [
    updateReelsType,
    {
      isError: isErrorUpdate,
      error: errorUpdate,
      isSuccess: isSuccessUpdate,
      isLoading: isLoadingUpdate,
      data: updatedEntity,
    },
  ] = useUpdateReelsTypesMutation()

  const {
    reset: resetFormData,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<IReelsTypeInputData>({ mode: 'onChange' })

  const dataInit: IReelsTypeCreateDto = {
    projectId: +id,
    name: '',
    code: '',
    createdBy: user,
  }

  const reelsTypeName = reelsType ? reelsType.name : watch('code')
  const setValuesHandler = useCallback(() => {
    reelsType && setValue('code', reelsType.code)
    setValue('name', reelsTypeName)
  }, [reelsType, reelsTypeName, setValue])

  const onCancelHandler = useCallback(() => {
    dispatch(setReelsTypeModal({ isOpen: false, mode: null }))
    resetFormData()
    resetNewEntity()
    setValuesHandler()
  }, [dispatch, resetFormData, resetNewEntity, setValuesHandler])

  const onNewEntitySubmitHandler = async (formData: IReelsTypeInputData) => {
    if (!formData.code || !formData.name) return
    const newData = { ...dataInit, ...formData, code: formData.code.toUpperCase() }
    await createReelsType(newData)
  }

  const onUpdateSubmitHandler = async (formData: IReelsTypeInputData) => {
    if (!formData.code || !formData.name) return
    const newData = { ...reelsType, ...formData, code: formData.code.toUpperCase() }
    await updateReelsType(newData)
  }

  useEffect(() => {
    setValuesHandler()
    if (isSuccessNewEntity && newEntity) {
      dispatch(setActiveReelsTypeId(newEntity.id))
      dispatch(setActiveReelsIds([]))
      onCancelHandler()
    }
    if (isSuccessUpdate && updatedEntity) {
      dispatch(setActiveReelsTypeId(updatedEntity.id))
      dispatch(setActiveReelsIds([]))
      onCancelHandler()
    }
  }, [
    dispatch,
    isSuccessNewEntity,
    isSuccessUpdate,
    newEntity,
    onCancelHandler,
    setValuesHandler,
    updatedEntity,
  ])

  return (
    <>
      <ModalWrapper
        warning={false}
        type={'type2'}
        size={'sm'}
        title={title}
        onSubmitHandler={handleSubmit(reelsType ? onUpdateSubmitHandler : onNewEntitySubmitHandler)}
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
        <LoadingOrError isLoading={isLoadingNewEntity} isError={isErrorNewEntity} error={errorNewEntity} />
        <LoadingOrError isLoading={isLoadingUpdate} isError={isErrorUpdate} error={errorUpdate} />
      </ModalWrapper>
    </>
  )
}
