import { skipToken } from '@reduxjs/toolkit/query'
import React, { FC, useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { setActiveReelsIds } from 'store/reducers/entities.reducer'
import { setReelModal, setReelsTypeModal } from 'store/reducers/modals.reducer'
import { useAppSelector } from 'hooks/redux'
import { useTranslate } from 'hooks/useTranslate'
import { LoadingOrError } from '../../../components/loadingOrError/LoadingOrError'
import { ModalWrapper } from '../../../components/modal/ModalWrapper'
import { IMode } from '../../../components/modal/modalWrapper.interfaces'
import { Switcher } from '../../../components/ui'
import { IOption } from '../../../components/ui/ui.types'
import { useGetReelsTypesQuery } from '../../reelsTypes/reelsTypes.api'
import { useCreateReelMutation, useUpdateReelMutation } from '../reels.api'
import { IReel, IReelCreateDto, IReelInputData } from '../reels.interfaces'

////////////////////////////////////////////////////////////////////////////////////////////
// Reel Modal
////////////////////////////////////////////////////////////////////////////////////////////

interface ReelModal {
  mode: IMode
  reel?: IReel
}

export const ReelModal: FC<ReelModal> = ({ mode, reel }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const { reelModal } = useAppSelector(state => state.modals)
  const title = mode === 'create' ? text.actions.addReel : text.actions.editReel
  const isOpen = reelModal.mode === mode && reelModal.isOpen

  const [
    createReel,
    {
      isError: isErrorNewEntity,
      error: errorNewEntity,
      isSuccess: isSuccessNewEntity,
      isLoading: isLoadingNewEntity,
      reset: resetNewEntity,
      data: newEntity,
    },
  ] = useCreateReelMutation()

  const [
    updateReel,
    {
      isError: isErrorUpdate,
      error: errorUpdate,
      isSuccess: isSuccessUpdate,
      isLoading: isLoadingUpdate,
      data: updatedEntity,
    },
  ] = useUpdateReelMutation()

  const { data: reelsTypes = [] } = useGetReelsTypesQuery(+id ?? skipToken)

  const {
    reset: resetFormData,
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<IReelInputData>({
    mode: 'onChange',
  })

  const dataInit: IReelCreateDto = {
    projectId: +id,
    duration: null,
    reelsTypeId: 'select',
    highPriority: false,
    createdBy: user,
  }

  const setValuesHandler = useCallback(() => {
    if (reel) {
      setValue('highPriority', reel.highPriority)
      setValue('duration', reel.duration)
      setValue('reelsTypeId', reel.reelsTypeId)
    }
  }, [reel, setValue])

  const onCancelHandler = useCallback(() => {
    dispatch(setReelModal({ isOpen: false, mode: null }))
    resetFormData()
    resetNewEntity()
  }, [dispatch, resetFormData, resetNewEntity])

  const onNewEntitySubmitHandler = async (formData: IReelInputData) => {
    const newData = {
      ...dataInit,
      ...formData,
      reelsTypeId: +formData.reelsTypeId,
      duration: +formData.duration,
    }
    await createReel(newData)
  }

  const onUpdateSubmitHandler = async (formData: IReelInputData) => {
    const reelType = reelsTypes.find(reelsType => reelsType.id === +formData.reelsTypeId)
    const newData = {
      ...reel,
      ...formData,
      reelsType: reelType,
      reelsTypeId: +formData.reelsTypeId,
      duration: +formData.duration,
    }
    await updateReel(newData)
  }

  const options: IOption[] = reelsTypes?.map(item => ({ label: `${item.code}`, value: item.id }))
  const watchSelectReelsTypeId = watch('reelsTypeId')

  useEffect(() => {
    setValuesHandler()
    if (watchSelectReelsTypeId === 'addNew') {
      dispatch(setReelsTypeModal({ isOpen: true, mode: 'create', zIndex: 1100 }))
    }
    if (isSuccessNewEntity && newEntity) {
      dispatch(setActiveReelsIds([newEntity.id]))
      onCancelHandler()
    }

    if (isSuccessUpdate && updatedEntity) {
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
    watchSelectReelsTypeId,
  ])

  console.log(reel)
  // RENDER
  ///////////////////////////////////////////////////////////////////////////////////////////

  return (
    <ModalWrapper
      warning={false}
      type={'type2'}
      size={'sm'}
      title={title}
      onSubmitHandler={handleSubmit(reel ? onUpdateSubmitHandler : onNewEntitySubmitHandler)}
      onCancelHandler={onCancelHandler}
      isValid={isValid}
      isOpen={isOpen}
    >
      <div className={'grid grid-cols-2 items-center gap-1'}>
        <label className={'flex justify-end'}>{text.project.reelType}:</label>
        <select
          {...register('reelsTypeId', {
            validate: value => (value !== 'select' ? true : text.error.selectReelsType),
          })}
        >
          <option value={'select'} label={text.actions.select} />
          {options?.map((item, idx) => (
            <option key={idx} value={item.value} label={item.label} />
          ))}
          <option value={'addNew'} label={text.actions.addNew} />
        </select>
        {errors?.reelsTypeId && <div className={'errorField'}>{errors?.reelsTypeId.message}</div>}

        <label className={'flex justify-end'}>{text.common.duration}:</label>
        <div className={'flex gap-1 items-center '}>
          <input
            className={'w-full'}
            type={'number'}
            min={1}
            max={9999}
            {...register('duration', {
              required: text.error.isRequired,
              max: { value: 9999, message: text.error.invalidValue },
            })}
          />
          <span>sec</span>
        </div>
        {errors?.duration && <div className={'errorField'}>{errors?.duration.message}</div>}

        <Controller
          control={control}
          name={'highPriority'}
          render={({ field: { onChange, value } }) => (
            <Switcher label={text.common.highPriority} checked={value} onChange={onChange} />
          )}
        />
      </div>

      <LoadingOrError isLoading={isLoadingNewEntity} isError={isErrorNewEntity} error={errorNewEntity} />
      <LoadingOrError isLoading={isLoadingUpdate} isError={isErrorUpdate} error={errorUpdate} />
    </ModalWrapper>
  )
}
