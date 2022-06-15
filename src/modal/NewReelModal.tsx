import { ModalWrapper } from './ModalWrapper'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { ErrorList } from '../components/errors/ErrorList'
import { FlexColumn, Input, Select } from '../components/ui'
import { IProject } from '../interfaces/IProject'
import { useCreateReelMutation, useGetReelsQuery } from '../store/api/reels.api'
import { IReelCreateDto } from '../interfaces/IReelCreateDto'
import { useParams } from 'react-router'
import { setActiveReelsIds } from '../store/reducers/entities.reducer'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetReelsTypesQuery } from '../store/api/reelsTypes.api'

interface INewReelModal {
  isOpen: boolean
  project: IProject
  closeAction: () => void
}

//
// NewReelModal
//

export const NewReelModal: FC<INewReelModal> = props => {
  const { closeAction, project, ...rest } = props
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const dataInit: IReelCreateDto = {
    duration: 0,
    projectId: +id,
    reelsTypeId: 0,
    createdBy: user,
  }

  const [data, setData] = useState<IReelCreateDto>(dataInit)

  const [createReel, { isError, error, isSuccess, reset, isLoading, data: newItem }] = useCreateReelMutation()
  const { data: reelsTypes } = useGetReelsTypesQuery(+id ?? skipToken)

  const options = reelsTypes?.map(item => ({ label: `${item.code} | ${item.name}`, value: item.id }))

  const [reelsTypeId, setReelsTypeId] = useState(0)

  const onChangeInputHandler = (key, value) => {
    setData({ ...data, [key]: value })
  }

  const onCancelHandler = async e => {
    e.preventDefault()
    reset()
    setReelsTypeId(0)
    closeAction()
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (reelsTypeId === 0 || !data.duration) return
    await createReel(data)
  }

  const onChangeReelsTypeHandler = e => {
    const newReelsTypeId = e.target.value
    setReelsTypeId(newReelsTypeId)
    setData({ ...data, reelsTypeId: +newReelsTypeId })
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setActiveReelsIds([newItem.id]))
      closeAction()
      setReelsTypeId(0)
      reset()
    }
  }, [closeAction, dispatch, isSuccess, newItem, reset])

  ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        {...rest}
        warning={false}
        type={'type2'}
        size={'sm'}
        title={text.actions.addReel}
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      >
        <Grid cols="auto" gap={5}>
          <div>
            <FlexColumn vAlign="center" padding={5}>
              {isError && <ErrorList error={error} />}
            </FlexColumn>
          </div>
          <Grid cols="auto" gap={5}>
            <Grid cols="max-content auto " marginTop={5} align={'right'}>
              <Select
                label={text.project.reelType}
                options={options}
                value={reelsTypeId}
                onChange={e => onChangeReelsTypeHandler(e)}
              />
              <Input
                label={text.reels.duration}
                onChange={e => onChangeInputHandler('duration', +e.target.value)}
                autoFocus={true}
              />
            </Grid>
          </Grid>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default NewReelModal
