import { skipToken } from '@reduxjs/toolkit/query'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { setActiveReelsIds } from 'store/reducers/entities.reducer'
import { setNewReelModalShow, setNewReelsTypeModalShow } from 'store/reducers/modals.reducer'
import { useAppSelector } from 'hooks/redux'
import { useTranslate } from 'hooks/useTranslate'
import { ErrorList } from '../../components/errors/ErrorList'
import { ModalWrapper } from '../../components/modal/ModalWrapper'
import { IZIndex } from '../../components/modal/modalWrapper.interfaces'
import { FlexColumn, Loader } from '../../components/ui'
import { IOption } from '../../components/ui/ui.types'
import { useGetReelsTypesQuery } from '../reelsTypes/reelsTypes.api'
import { useCreateReelMutation } from './reels.api'
import { IReelCreateDto, IReelInputData } from './reels.interfaces'

interface INewReelModal {
  isOpen: boolean
  zIndex?: IZIndex
}

// NewReelModal
////////////////////////////////////////////////////////////////////////////////////////////

export const NewReelModal: FC<INewReelModal> = props => {
  const { isOpen, ...rest } = props

  const {
    reset: resetData,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IReelInputData>({ mode: 'onChange' })

  // const dispatch = useAppDispatch()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const dataInit: IReelCreateDto = {
    projectId: +id,
    duration: 0,
    reelsTypeId: 0,
    highPriority: false,
    createdBy: user,
  }

  const [createReel, { isError, error, isSuccess, reset, isLoading, data: newReel }] = useCreateReelMutation()
  const { data: reelsTypes = [] } = useGetReelsTypesQuery(+id ?? skipToken)

  const addItemOption = { label: 'Add new ReelType', value: 1 }
  const reelsTypeOptions = reelsTypes?.map(item => ({ label: `${item.code}`, value: item.id }))
  const options: IOption[] = [addItemOption, ...reelsTypeOptions]

  const { newReelsTypeModalShow } = useAppSelector(state => state.modals)

  const [selectNewReelsType, setSelectNewReelsType] = useState(false)

  const onCancelHandler = useCallback(() => {
    dispatch(setNewReelModalShow(false))
    resetData()
  }, [dispatch, resetData])

  const onSubmitHandler: SubmitHandler<IReelInputData> = async (formData: IReelInputData) => {
    const newFormData = {
      ...dataInit,
      ...formData,
      reelsTypeId: +formData.reelsTypeId,
      duration: +formData.duration,
    }
    console.log(newFormData)
    await createReel(newFormData)
  }

  const optionsJsx = options?.map((item, idx) => <option key={idx} value={item.value} label={item.label} />)
  const watchSelectReelsTypeId = +watch('reelsTypeId')

  useEffect(() => {
    if (watchSelectReelsTypeId === 1) {
      dispatch(setNewReelsTypeModalShow(true))
    }
    if (isSuccess && newReel) {
      dispatch(setActiveReelsIds([newReel.id]))
      onCancelHandler()
    }
  }, [dispatch, isSuccess, newReel, onCancelHandler, watchSelectReelsTypeId])

  // RENDER
  ///////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        isOpen={isOpen}
        warning={false}
        type={'type2'}
        size={'sm'}
        title={text.actions.addReel}
        onSubmitHandler={handleSubmit(onSubmitHandler)}
        onCancelHandler={onCancelHandler}
        isValid={isValid}
        {...rest}
      >
        <div className={'flex flex-col'}>
          <FlexColumn vAlign="center" padding={5}>
            {isLoading && <Loader size={24} />}
            {isError && <ErrorList error={error} />}
            {/* {customError && <div className={'error'}>{customError}</div>} */}
          </FlexColumn>
        </div>

        <div className={'grid grid-cols-2 items-center gap-1'}>
          <label className={'flex justify-end'}>{text.project.reelType}:</label>
          <select placeholder={'Select...'} {...register('reelsTypeId', { required: text.error.isRequired })}>
            <option value={0} label={text.actions.select} />
            {optionsJsx}
          </select>

          <label className={'flex justify-end'}>{text.reels.duration}:</label>
          <div className={'flex gap-1 items-center'}>
            <input
              size={4}
              max={9999}
              minLength={1}
              maxLength={4}
              {...register('duration', { required: text.error.isRequired })}
            />
            <span>sec</span>
          </div>
          {/* <Switcher */}
          {/*   label={text.common.highPriority} */}
          {/*   checked={highPriority} */}
          {/*   onChange={() => onChangePriority(highPriority)} */}
          {/* /> */}
        </div>
      </ModalWrapper>
    </>
  )
}

export default NewReelModal
