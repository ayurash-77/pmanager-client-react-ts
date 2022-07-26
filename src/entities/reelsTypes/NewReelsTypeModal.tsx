import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { ErrorList } from '../../components/errors/ErrorList'
import { ModalWrapper } from '../../components/modal/ModalWrapper'
import { Loader } from '../../components/ui'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useTranslate } from '../../hooks/useTranslate'
import { setActiveReelsTypeId } from '../../store/reducers/entities.reducer'
import { IProject } from '../projects/projects.interfaces'
import { useCreateReelsTypesMutation } from './reelsTypes.api'
import { IReelsTypeCreateDto, IReelsTypeInputData } from './reelsTypes.interfaces'

interface INewReelsTypeModal {
  isOpen: boolean
  project: IProject
  closeAction: () => void
}

//
// NewReelsTypeModal
//

export const NewReelsTypeModal: FC<INewReelsTypeModal> = props => {
  const { closeAction, project, ...rest } = props

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

  const onCancelHandler = e => {
    e.preventDefault()
    closeAction()
    resetData()
    reset()
  }

  const onSubmitHandler = async (data: IReelsTypeInputData) => {
    if (!data.code || !data.name) return
    await createReelsType({ ...dataInit, ...data })
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setActiveReelsTypeId(newReelType.id))
      closeAction()
      resetData()
      reset()
    }
  }, [closeAction, dispatch, isSuccess, newReelType, reset, resetData])

  ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        {...rest}
        warning={false}
        type={'type2'}
        size={'sm'}
        title={text.actions.addReelsType}
        onSubmitHandler={handleSubmit(onSubmitHandler)}
        onCancelHandler={onCancelHandler}
        isValid={isValid}
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
