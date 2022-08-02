import { skipToken } from '@reduxjs/toolkit/query'
import React, { FC, useCallback, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { setActiveReelsIds } from 'store/reducers/entities.reducer'
import { setReelModal, setReelsTypeModal } from 'store/reducers/modals.reducer'
import { useAppSelector } from 'hooks/redux'
import { useTranslate } from 'hooks/useTranslate'
import { LoadingOrError } from '../../../components/loadingOrError/LoadingOrError'
import { ModalWrapper } from '../../../components/modal/ModalWrapper'
import { Switcher } from '../../../components/ui'
import { IOption } from '../../../components/ui/ui.types'
import { useGetReelsTypesQuery } from '../../reelsTypes/reelsTypes.api'
import { useCreateReelMutation } from '../reels.api'
import { IReelCreateDto, IReelInputData } from '../reels.interfaces'

////////////////////////////////////////////////////////////////////////////////////////////
// Reel Modal
////////////////////////////////////////////////////////////////////////////////////////////

export const NewReelModal: FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const { reelModal } = useAppSelector(state => state.modals)
  const isOpen = reelModal.mode === 'create' && reelModal.isOpen

  const [createReel, { isError, error, isSuccess, isLoading, reset, data: newReel }] = useCreateReelMutation()
  const { data: reelsTypes = [] } = useGetReelsTypesQuery(+id ?? skipToken)

  const dataInit: IReelCreateDto = {
    projectId: +id,
    duration: null,
    reelsTypeId: 'select',
    highPriority: false,
    createdBy: user,
  }
  const {
    reset: resetData,
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<IReelInputData>({
    defaultValues: { reelsTypeId: 'select', duration: null, highPriority: false },
    mode: 'onChange',
  })

  const onCancelHandler = useCallback(() => {
    dispatch(setReelModal({ isOpen: false, mode: null }))
    resetData()
    reset()
  }, [dispatch, reset, resetData])

  const onSubmitHandler: SubmitHandler<IReelInputData> = async (formData: IReelInputData) => {
    const newFormData = {
      ...dataInit,
      ...formData,
      reelsTypeId: +formData.reelsTypeId,
      duration: +formData.duration,
    }
    await createReel(newFormData)
  }

  const options: IOption[] = reelsTypes?.map(item => ({ label: `${item.code}`, value: item.id }))
  const watchSelectReelsTypeId = watch('reelsTypeId')

  useEffect(() => {
    if (watchSelectReelsTypeId === 'addNew') {
      dispatch(setReelsTypeModal({ isOpen: true, mode: 'create', zIndex: 1100 }))
    }
    if (isSuccess && newReel) {
      dispatch(setActiveReelsIds([newReel.id]))
      onCancelHandler()
    }
  }, [dispatch, isSuccess, newReel, onCancelHandler, watchSelectReelsTypeId])

  // RENDER
  ///////////////////////////////////////////////////////////////////////////////////////////

  return (
    <ModalWrapper
      warning={false}
      type={'type2'}
      size={'sm'}
      title={text.actions.addReel}
      onSubmitHandler={handleSubmit(onSubmitHandler)}
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

      <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
    </ModalWrapper>
  )
}
