import { DetailedHTMLProps, FC, HTMLAttributes, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { setActiveReelsIds, setActiveReelsTypeId } from 'store/reducers/entities.reducer'
import { setNewReelsTypeModalShow } from 'store/reducers/modals.reducer'
import { useTranslate } from 'hooks/useTranslate'
import { ErrorList } from '../../components/errors/ErrorList'
import { ModalWrapper } from '../../components/modal/ModalWrapper'
import { IZIndex } from '../../components/modal/modalWrapper.interfaces'
import { Loader } from '../../components/ui'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useCreateReelsTypesMutation } from './reelsTypes.api'
import { IReelsTypeCreateDto, IReelsTypeInputData } from './reelsTypes.interfaces'

interface INewReelsTypeModal extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpen: boolean
  zIndex?: IZIndex
}

//
// NewReelsTypeModal
//

export const NewReelsTypeModal: FC<INewReelsTypeModal> = props => {
  const { isOpen, ...rest } = props

  const {
    reset: resetData,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IReelsTypeInputData>({ mode: 'onChange' })

  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const dataInit: IReelsTypeCreateDto = {
    projectId: +id,
    name: '',
    code: '',
    createdBy: user,
  }

  const [createReelsType, { isError, error, isSuccess, reset, isLoading, data: newReelType }] =
    useCreateReelsTypesMutation()

  const onCancelHandler = useCallback(() => {
    dispatch(setNewReelsTypeModalShow(false))
    resetData()
  }, [dispatch, resetData])

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
        isOpen={isOpen}
        type={'type2'}
        size={'sm'}
        title={text.actions.addReelsType}
        onSubmitHandler={handleSubmit(onSubmitHandler)}
        onCancelHandler={onCancelHandler}
        isValid={isValid}
        {...rest}
      >
        <div className={'flex flex-col'}>
          {isLoading && <Loader size={24} />}
          {isError && <ErrorList error={error} />}
        </div>

        <div className={'grid grid-cols-2 justify-end items-center gap-1'}>
          <label className={'flex justify-end'}>{text.reelsTypes.name}:</label>

          <input
            placeholder={text.reelsTypes.name}
            autoFocus={true}
            {...register('name', { required: text.error.isRequired })}
          />
          {errors?.name && <div className={'errorField col-start-2'}>{text.error.fieldRequired}</div>}

          <label>{text.reelsTypes.code}:</label>
          <input
            minLength={3}
            maxLength={4}
            className={'uppercase'}
            placeholder={text.reelsTypes.code}
            {...register('code', { required: text.error.isRequired })}
          />
          {errors?.code && <div className={'errorField col-start-2'}>{text.error.fieldRequired}</div>}
        </div>
      </ModalWrapper>
    </>
  )
}

export default NewReelsTypeModal
