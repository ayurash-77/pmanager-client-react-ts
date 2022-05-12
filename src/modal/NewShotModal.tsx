import { ModalWrapper } from './ModalWrapper'
import { FC, useEffect, useMemo, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { ErrorList } from '../components/errors/ErrorList'
import { FlexColumn, Input, Select } from '../components/ui'
import { IProject } from '../interfaces/IProject'
import { IShotCreateDto } from '../interfaces/IShotCreateDto'
import { useCreateShotMutation } from '../store/api/shots.api'
import { setActiveShotId } from '../store/reducers/entities.reducer'
import { IShot } from '../interfaces/IShot'
import { useGetReelsByProjectId } from '../hooks/api/useReelsApi'
import { useGetPostsByProjectId } from '../hooks/api/usePostsApi'

interface INewShotModal {
  isOpen: boolean
  project: IProject
  closeAction: () => void
  shots: IShot[]
}

//
// NewShotModal
//

export const NewShotModal: FC<INewShotModal> = ({ closeAction, project, shots, ...props }) => {
  // const { activeProjectId } = useAppSelector(state => state.projects)

  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const dataInit: IShotCreateDto = useMemo(
    () => ({
      projectId: project?.id,
      reelId: 0,
      duration: 0,
      number: '',
      createdBy: user,
    }),
    [project, user]
  )

  const [data, setData] = useState<IShotCreateDto>(dataInit)
  const [shotNumber, setShotNumber] = useState('')
  const [code, setCode] = useState(null)
  const [reelId, setReelId] = useState(0)

  const [createShot, { isError, error, isSuccess, status, data: newItem, reset }] = useCreateShotMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const { data: reels, refetch: refetchReels } = useGetReelsByProjectId(project?.id)
  const { data: posts, refetch: refetchPosts } = useGetPostsByProjectId(project?.id)

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

  const onSubmitHandler = e => {
    e.preventDefault()
    createShot({ ...data, number: shotNumber, reelId: reelId })
    setShotNumber('')
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
        {...props}
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
              {isError && errorJsx}
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
