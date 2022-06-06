import { ModalWrapper } from './ModalWrapper'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { ErrorList } from '../components/errors/ErrorList'
import { FlexColumn, Input } from '../components/ui'
import { IProject } from '../interfaces/IProject'
import { useParams } from 'react-router'
import { IReelsTypeCreateDto } from '../interfaces/IReelsTypeCreateDto'
import { setActiveReelsTypeId } from '../store/reducers/entities.reducer'
import { useCreateReelsType } from '../hooks/api/useReelsTypesApi'

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

  const [data, setData] = useState<IReelsTypeCreateDto>(dataInit)
  // const [error, setError] = useState(null)

  const {
    mutate: createReelsType,
    isError: isErrorCreateReelsType,
    error,
    isSuccess,
    data: newItem,
  } = useCreateReelsType(+id)
  // const errorJsx = ErrorList(error?.message?.length > 0 ? error.message : [])
  // const errorJsx = () => <div className="error">{error?.message}</div>

  const onChangeHandler = (key, target) => {
    setData({ ...data, [key]: target.value })
  }

  const onCancelHandler = e => {
    e.preventDefault()
    setData(dataInit)
    closeAction()
  }

  const onSubmitHandler = e => {
    e.preventDefault()
    if (!data.name || !data.code) return
    createReelsType(data)
  }

  // console.log('isSuccess: ', isSuccess)
  // console.log('isErrorCreateReelsType: ', isErrorCreateReelsType)

  useEffect(() => {
    if (isSuccess) {
      // console.log('isSuccess: ', isSuccess)
      console.log('newItem: ', newItem)
      // dispatch(setActiveReelsTypeId(newItem?.id))
      // setData(dataInit)
      closeAction()
    }
    // eslint-disable-next-line
  }, [isSuccess])

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
          <div>
            <FlexColumn vAlign="center" padding={5}>
              {/* {error && <div className="error">error</div>} */}
              {isErrorCreateReelsType && <div>error?.message</div>}
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
