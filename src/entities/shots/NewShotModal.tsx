import { skipToken } from '@reduxjs/toolkit/query'
import { FC, useEffect, useState } from 'react'
import { ErrorList } from '../../components/errors/ErrorList'
import { ModalWrapper } from '../../components/modal/ModalWrapper'
import { FlexColumn, Grid, Input, Select } from '../../components/ui'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useTranslate } from '../../hooks/useTranslate'
import { setActiveShotId } from '../../store/reducers/entities.reducer'
import { useGetPostsQuery } from '../posts/posts.api'
import { IProject } from '../projects/projects.interfaces'
import { useGetReelsQuery } from '../reels/reels.api'
import { useCreateShotMutation } from './shots.api'
import { IShot, IShotCreateDto } from './shots.interfaces'

interface INewShotModal {
  isOpen: boolean
  project: IProject
  closeAction: () => void
  shots: IShot[]
}

//
// NewShotModal
//

export const NewShotModal: FC<INewShotModal> = props => {
  const { closeAction, project, shots, ...rest } = props
  const { activeProjectId } = useAppSelector(state => state.entities)

  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const dataInit: IShotCreateDto = {
    projectId: activeProjectId,
    reelId: 0,
    duration: 0,
    number: '',
    createdBy: user,
  }

  const [data, setData] = useState<IShotCreateDto>(dataInit)
  const [shotNumber, setShotNumber] = useState('')
  const [code, setCode] = useState(null)
  const [reelId, setReelId] = useState(0)

  const [createShot, { isError, error, isSuccess, status, data: newItem, reset }] = useCreateShotMutation()

  const { data: reels, refetch: refetchReels } = useGetReelsQuery(activeProjectId ?? skipToken)
  const { data: posts, refetch: refetchPosts } = useGetPostsQuery(activeProjectId ?? skipToken)

  const options = reels?.map(item => ({ label: item.code, value: item.id }))

  const shotNumbers = shots?.map(
    shot => shot.code.split('_')[0] === code && Math.trunc(parseInt(shot.code.split('_').pop()) / 10)
  )
  const maxNumber = shotNumbers?.length > 0 ? Math.max(...shotNumbers) : null

  const dispatch = useAppDispatch()

  const onChangeInputHandler = (key, value) => {
    setData({ ...data, [key]: value })
  }

  const onChangeShotNumberHandler = value => {
    setShotNumber(value)
    setData({ ...data, number: value })
  }

  const onCancelHandler = async e => {
    e.preventDefault()
    setData(dataInit)
    setReelId(0)
    setCode(null)
    setShotNumber('')
    reset()
    closeAction()
  }

  const onChangeReelIdHandler = e => {
    const newReelsTypeId = +e.target.value
    setReelId(newReelsTypeId)
    setCode(options.find(val => val.value === newReelsTypeId)?.label.split('_')[0])
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    console.log(data)
    await createShot({ ...data, number: shotNumber, reelId: reelId })
  }

  // console.log(status)

  useEffect(() => {
    status !== 'pending' && maxNumber && setShotNumber(maxNumber < 99 && `00${maxNumber * 10 + 10}`.slice(-3))
    status !== 'pending' && reelId && !maxNumber && setShotNumber('010')

    if (isSuccess) {
      setShotNumber('')
      dispatch(setActiveShotId(newItem?.id))
      closeAction()
      setReelId(0)
      setCode(null)
      reset()
      refetchReels()
      refetchPosts()
    }
  }, [
    closeAction,
    dispatch,
    isSuccess,
    maxNumber,
    newItem?.id,
    reelId,
    refetchPosts,
    refetchReels,
    reset,
    status,
  ])

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        {...rest}
        warning={false}
        type={'type2'}
        size={'sm'}
        title={text.actions.addShot}
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
                label={text.project.reel}
                options={options}
                value={reelId}
                onChange={e => onChangeReelIdHandler(e)}
              />
              <Input
                value={shotNumber}
                placeholder={shotNumber}
                label={text.common.number}
                onChange={e => onChangeShotNumberHandler(e.target.value)}
              />
              <Input
                label={text.common.durationInFrames}
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

export default NewShotModal
