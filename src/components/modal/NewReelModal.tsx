import { skipToken } from '@reduxjs/toolkit/query'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
import { IReelCreateDto } from '../../interfaces/IReelCreateDto'
import { useCreateReelMutation } from '../../store/api/reels.api'
import { useGetReelsTypesQuery } from '../../store/api/reelsTypes.api'
import { setActiveReelsIds } from '../../store/reducers/entities.reducer'
import { ErrorList } from '../errors/ErrorList'
import { FlexColumn, Grid, IOption, Input, Select, Switcher } from '../ui'
import { ModalWrapper } from './ModalWrapper'
import NewReelsTypeModal from './NewReelsTypeModal'

interface INewReelModal {
  isOpen: boolean
  project: IProject
  closeAction: () => void
}

// NewReelModal
////////////////////////////////////////////////////////////////////////////////////////////

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
    highPriority: false,
  }

  const [data, setData] = useState(dataInit)

  const [createReel, { isError, error, isSuccess, reset, data: newItem }] = useCreateReelMutation()
  const { data: reelsTypes = [], currentData: currentDataReelsTypes } = useGetReelsTypesQuery(
    +id ?? skipToken
  )

  const addItemOption = { label: 'Add new ReelType', value: 1 }
  const reelsTypeOptions = reelsTypes?.map(item => ({ label: `${item.code}`, value: item.id }))
  const options: IOption[] = [addItemOption, ...reelsTypeOptions]

  const [reelsTypeId, setReelsTypeId] = useState(0)
  const [customError, setCustomError] = useState(null)
  const [isNewReelsTypeModalShow, setNewReelsTypeModalShow] = useState(false)

  const [highPriority, setHighPriority] = useState(false)

  const onChangeInputHandler = (key, value) => {
    setData({ ...data, [key]: value })
  }

  const onChangePriority = val => {
    setHighPriority(!val)
    onChangeInputHandler('highPriority', !val)
  }

  const onCancelHandler = async e => {
    e.preventDefault()
    reset()
    setReelsTypeId(0)
    closeAction()
    setCustomError(null)
    setHighPriority(false)
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (reelsTypeId === 0) {
      setCustomError('Не выбран тип ролика')
      return
    }
    if (!data.duration) {
      setCustomError('Хронометраж ролика должен быть в секундах')
      return
    }
    await createReel(data)
  }

  const onChangeReelsTypeHandler = e => {
    const newReelsTypeId = e.target.value
    if (newReelsTypeId == 1) {
      setNewReelsTypeModalShow(true)
    }
    setReelsTypeId(newReelsTypeId)
    setData({ ...data, reelsTypeId: +newReelsTypeId })
  }

  useEffect(() => {
    if (isNewReelsTypeModalShow) setReelsTypeId(0)
  }, [isNewReelsTypeModalShow])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setActiveReelsIds([newItem.id]))
      reset()
      closeAction()
      setReelsTypeId(0)
      setHighPriority(false)
      setCustomError(null)
    }
  }, [closeAction, dispatch, isSuccess, newItem, reset])

  // RENDER
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
        <FlexColumn gap={5}>
          <div>
            <FlexColumn vAlign="center" padding={5}>
              {isError && <ErrorList error={error} />}
              {customError && <div className={'error'}>{customError}</div>}
            </FlexColumn>
          </div>

          <Grid cols="max-content auto auto auto" marginTop={5} align={'right'}>
            <Select
              label={text.project.reelType}
              placeholder={'Select...'}
              options={options}
              value={reelsTypeId}
              onChange={e => onChangeReelsTypeHandler(e)}
              width={'auto'}
            />

            <Input
              size={4}
              type={'number'}
              width={36}
              maxLength={4}
              onChange={e => onChangeInputHandler('duration', +e.target.value)}
            />

            <div>sec</div>
            <Switcher
              label={text.common.highPriority}
              checked={highPriority}
              onChange={() => onChangePriority(highPriority)}
            />
          </Grid>
        </FlexColumn>
      </ModalWrapper>
      <NewReelsTypeModal
        isOpen={isNewReelsTypeModalShow}
        closeAction={() => setNewReelsTypeModalShow(false)}
        project={project}
      />
    </>
  )
}

export default NewReelModal
