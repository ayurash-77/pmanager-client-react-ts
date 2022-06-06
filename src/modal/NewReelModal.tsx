import { ModalWrapper } from './ModalWrapper'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { ErrorList } from '../components/errors/ErrorList'
import { FlexColumn, Input, Select } from '../components/ui'
import { IProject } from '../interfaces/IProject'
import { useCreateReelMutation } from '../store/api/reels.api'
import { IReelCreateDto } from '../interfaces/IReelCreateDto'
import { useParams } from 'react-router'
import { setActiveReelsIds } from '../store/reducers/entities.reducer'
import { useGetReelsTypesByProjectId } from '../hooks/api/useReelsTypesApi'

interface INewReelModal {
  isOpen: boolean
  project: IProject
  closeAction: () => void
}

//
// NewReelModal
//

export const NewReelModal: FC<INewReelModal> = ({ closeAction, project, ...props }) => {
  const { id } = useParams()
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const dataInit: IReelCreateDto = useMemo(
    () => ({
      duration: 0,
      projectId: +id,
      reelsTypeId: 0,
      createdBy: user,
    }),
    [id, user]
  )

  const [data, setData] = useState<IReelCreateDto>(dataInit)

  const [createReel, { isError, error, isSuccess, data: newItem }] = useCreateReelMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const { data: reelsTypes, refetch: refetchReelsTypes } = useGetReelsTypesByProjectId(+id)

  const reelsTypesSorted = useMemo(() => {
    const reelsTypesSorted = reelsTypes?.slice()
    reelsTypesSorted?.sort((a, b) => a.code.localeCompare(b.code))
    return reelsTypesSorted
  }, [reelsTypes])

  const options = reelsTypesSorted?.map(item => ({ label: `${item.code} | ${item.name}`, value: item.id }))

  const [reelsTypeId, setReelsTypeId] = useState(0)

  const dispatch = useAppDispatch()

  const clearData = useCallback(() => {
    setData(dataInit)
    setReelsTypeId(0)
  }, [dataInit])

  const onChangeInputHandler = (key, value) => {
    setData({ ...data, [key]: value })
  }

  const onCancelHandler = async e => {
    e.preventDefault()
    clearData()
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
      refetchReelsTypes()
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
        title={text.actions.addReel}
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      >
        <Grid cols="auto" gap={5}>
          <div>
            <FlexColumn vAlign="center" padding={5}>
              <>{isError && errorJsx}</>
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
