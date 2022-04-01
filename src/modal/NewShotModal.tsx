import { ModalWrapper } from './ModalWrapper'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui'
import { useAppSelector } from '../hooks/redux'
import { ErrorList } from '../components/errors/ErrorList'
import { FlexColumn, Input, Select } from '../components/ui'
import { IProject } from '../interfaces/IProject'
import { useGetReelsByProjectIdQuery } from '../store/api/reels.api'
import { IShotCreateDto } from '../interfaces/IShotCreateDto'
import { useCreateShotMutation } from '../store/api/shots.api'
import { useParams } from 'react-router'
import { useGetReelsTypesByProjectIdQuery } from '../store/api/reelsTypes.api'

interface INewShotModal {
  isOpen: boolean
  project: IProject
  closeAction: () => void
}

//
// NewShotModal
//

export const NewShotModal: FC<INewShotModal> = ({ closeAction, project, ...props }) => {
  const { id } = useParams()
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const dataInit: IShotCreateDto = useMemo(
    () => ({
      projectId: +id,
      reelId: 0,
      duration: 0,
      number: '010',
      createdBy: user,
    }),
    [id, user]
  )

  const [data, setData] = useState<IShotCreateDto>(dataInit)

  const [createShot, { isError, error, isSuccess }] = useCreateShotMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const { refetch: refetchReelsTypes } = useGetReelsTypesByProjectIdQuery(+id)
  const { data: reels, refetch: refetchReels } = useGetReelsByProjectIdQuery(+id)

  const reelsSorted = useMemo(() => {
    const reelsSorted = reels?.slice()
    reelsSorted?.sort((a, b) => a.code.localeCompare(b.code))
    return reelsSorted
  }, [reels])

  const options = reelsSorted?.map(item => ({ label: item.code, value: item.id }))

  const [reelId, setReelId] = useState(0)

  const clearData = useCallback(() => {
    setData(dataInit)
    setReelId(0)
  }, [dataInit])

  const onChangeInputHandler = (key, value) => {
    setData({ ...data, [key]: value })
  }

  const onCancelHandler = async e => {
    e.preventDefault()
    clearData()
    closeAction()
  }

  const onChangeReelIdHandler = e => {
    const newReelsTypeId = +e.target.value
    setReelId(newReelsTypeId)
    setData({ ...data, reelId: newReelsTypeId })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    // if (reelId === 0 || !data.number) return
    await createShot(data)
  }

  useEffect(() => {
    if (isSuccess) {
      refetchReelsTypes()
      refetchReels()
      closeAction()
      clearData()
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
                label={text.shots.number}
                onChange={e => onChangeInputHandler('number', e.target.value)}
                autoFocus={true}
              />
              <Input
                label={text.shots.duration}
                onChange={e => onChangeInputHandler('duration', +e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default NewShotModal
