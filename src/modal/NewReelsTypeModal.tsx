import { ModalWrapper } from './ModalWrapper'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { ErrorList } from '../components/errors/ErrorList'
import { FlexColumn, Input } from '../components/ui'
import { IProject } from '../interfaces/IProject'
import { useCreateReelsTypesMutation } from '../store/api/reelsTypes.api'
import { useParams } from 'react-router'
import { IReelsTypeCreateDto } from '../interfaces/IReelsTypeCreateDto'
import { setActiveReelsTypeId } from '../store/reducers/entities.reducer'

interface INewReelsTypeModal {
  isOpen: boolean
  project: IProject
  closeAction: () => void
}

//
// NewReelsTypeModal
//

export const NewReelsTypeModal: FC<INewReelsTypeModal> = ({ closeAction, project, ...props }) => {
  const { id } = useParams()
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const dataInit: IReelsTypeCreateDto = useMemo(
    () => ({
      projectId: +id,
      name: '',
      code: '',
      createdBy: user,
    }),
    [id, user]
  )

  const [data, setData] = useState<IReelsTypeCreateDto>(dataInit)

  const [createReelsType, { isError, error, isSuccess, data: newItem }] = useCreateReelsTypesMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const dispatch = useAppDispatch()

  const clearData = useCallback(() => {
    setData(dataInit)
  }, [dataInit])

  const onChangeHandler = (key, target) => {
    setData({ ...data, [key]: target.value })
  }

  const onCancelHandler = async e => {
    e.preventDefault()
    clearData()
    closeAction()
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (!data.name || !data.code) return
    await createReelsType(data)
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setActiveReelsTypeId(newItem.id))
      clearData()
      closeAction()
    }
    // eslint-disable-next-line
  }, [isSuccess])

  ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        {...props}
        warning={false}
        type={'type2'}
        size={'sm'}
        title={text.actions.addReelsType}
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      >
        <Grid cols="auto" gap={5}>
          <div>
            <FlexColumn vAlign="center" padding={5}>
              {isError && errorJsx}
            </FlexColumn>
          </div>
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
