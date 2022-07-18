import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ErrorList } from '../components/errors/ErrorList'
import { FlexColumn, Grid, Input, Loader } from '../components/ui'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useTranslate } from '../hooks/useTranslate'
import { IProject } from '../interfaces/IProject'
import { IReelsTypeCreateDto } from '../interfaces/IReelsTypeCreateDto'
import { useCreateReelsTypesMutation } from '../store/api/reelsTypes.api'
import { setActiveReelsTypeId } from '../store/reducers/entities.reducer'
import { ModalWrapper } from './ModalWrapper'

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

  const [data, setData] = useState(dataInit)

  const [createReelsType, { isError, error, isSuccess, reset, isLoading, data: newReelType }] =
    useCreateReelsTypesMutation()

  const onChangeHandler = (key, target) => {
    setData({ ...data, [key]: target.value })
  }

  const onCancelHandler = e => {
    e.preventDefault()
    closeAction()
    reset()
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (!data.code || !data.name) return
    await createReelsType(data)
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setActiveReelsTypeId(newReelType.id))
      closeAction()
      reset()
    }
  }, [closeAction, dispatch, isSuccess, newReelType, reset])

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
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      >
        <Grid cols="auto" gap={5}>
          <FlexColumn vAlign="center" padding={5}>
            {isLoading && <Loader size={24} />}
            {isError && <ErrorList error={error} />}
          </FlexColumn>

          <Grid cols="auto" gap={5}>
            <Grid cols="max-content auto " marginTop={5} align={'right'}>
              <Input
                label={text.reelsTypes.name}
                onChange={e => onChangeHandler('name', e.target)}
                autoFocus={true}
              />
              <Input
                label={text.reelsTypes.code}
                onChange={e => onChangeHandler('code', e.target)}
                autoFocus={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default NewReelsTypeModal
