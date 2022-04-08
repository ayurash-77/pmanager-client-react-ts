import { ModalWrapper } from './ModalWrapper'
import { FC, useEffect, useMemo, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { ErrorList } from '../components/errors/ErrorList'
import { FlexColumn, Input, Select } from '../components/ui'
import { IProject } from '../interfaces/IProject'
import { useGetReelsByProjectIdQuery } from '../store/api/reels.api'
import { IShotCreateDto } from '../interfaces/IShotCreateDto'
import { useCreateShotMutation } from '../store/api/shots.api'
import { useParams } from 'react-router'
import { setActiveShotId } from '../store/reducers/entities.reducer'
import { IShot } from '../interfaces/IShot'

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
  const { id } = useParams()
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const dataInit: IShotCreateDto = useMemo(
    () => ({
      projectId: +id,
      reelId: 0,
      duration: 0,
      number: '',
      createdBy: user,
    }),
    [id, user]
  )

  const [data, setData] = useState<IShotCreateDto>(dataInit)
  const [shotNumber, setShotNumber] = useState('')
  const [code, setCode] = useState(null)
  const [reelId, setReelId] = useState(0)

  const [createShot, { isError, error, isSuccess, data: newItem, reset }] = useCreateShotMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const { data: reels } = useGetReelsByProjectIdQuery(+id)

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
  }

  useEffect(() => {
    maxNumber && setShotNumber(maxNumber < 99 && `00${maxNumber * 10 + 10}`.slice(-3))

    if (isSuccess) {
      dispatch(setActiveShotId(newItem?.id))
      closeAction()
      setReelId(0)
      setCode(null)
      setShotNumber('')
      reset()
    }
  }, [closeAction, dispatch, isSuccess, maxNumber, newItem?.id, reset])

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        {...props}
        warning={false}
        type={'type1'}
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
