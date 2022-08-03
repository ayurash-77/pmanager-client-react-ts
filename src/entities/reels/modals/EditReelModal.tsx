import { skipToken } from '@reduxjs/toolkit/query'
import React, { FC, useCallback, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { setReelModal, setReelsTypeModal } from 'store/reducers/modals.reducer'
import { useAppSelector } from 'hooks/redux'
import { useTranslate } from 'hooks/useTranslate'
import { LoadingOrError } from '../../../components/loadingOrError/LoadingOrError'
import { ModalWrapper } from '../../../components/modal/ModalWrapper'
import { Switcher } from '../../../components/ui'
import { IOption } from '../../../components/ui/ui.types'
import { useGetReelsTypesQuery } from '../../reelsTypes/reelsTypes.api'
import { useUpdateReelMutation } from '../reels.api'
import { IReel, IReelInputData } from '../reels.interfaces'

////////////////////////////////////////////////////////////////////////////////////////////
// Reel Modal
////////////////////////////////////////////////////////////////////////////////////////////

interface IEditReelModal {
  item: IReel
}

export const EditReelModal: FC<IEditReelModal> = ({ item: reel }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { text } = useTranslate()

  // const { activeReelsIds } = useAppSelector(state => state.entities)
  const { data: reelsTypes = [] } = useGetReelsTypesQuery(+id ?? skipToken)
  // const { data: reel } = useGetReelQuery(activeReelsIds[0] ?? skipToken)
  const [updateReel, { isError, error, isSuccess, isLoading, reset, data: updatedReel }] =
    useUpdateReelMutation()

  const { reelModal } = useAppSelector(state => state.modals)
  const isOpen = reel && reelModal.mode === 'edit' && reelModal.isOpen

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<IReelInputData>({ mode: 'onChange' })

  const onCancelHandler = useCallback(() => {
    reset()
    dispatch(setReelModal({ isOpen: false, mode: null }))
  }, [dispatch, reset])

  const onSubmitHandler: SubmitHandler<IReelInputData> = async (formData: IReelInputData) => {
    const reelType = reelsTypes.find(reelsType => reelsType.id === +formData.reelsTypeId)
    const newFormData = {
      ...reel,
      ...formData,
      reelsType: reelType,
      reelsTypeId: +formData.reelsTypeId,
      duration: +formData.duration,
    }
    await updateReel(newFormData)
  }

  const options: IOption[] = reelsTypes?.map(item => ({ label: `${item.code}`, value: item.id }))
  const watchSelectReelsTypeId = watch('reelsTypeId')

  useEffect(() => {
    setValue('highPriority', reel.highPriority)
    setValue('duration', reel.duration)
    setValue('reelsTypeId', reel.reelsTypeId)
  }, [reel, setValue])

  useEffect(() => {
    if (watchSelectReelsTypeId === 'addNew') {
      dispatch(setReelsTypeModal({ isOpen: true, mode: 'create', zIndex: 1100 }))
    }
    isSuccess && updatedReel && onCancelHandler()
  }, [dispatch, isSuccess, onCancelHandler, updatedReel, watchSelectReelsTypeId])

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
