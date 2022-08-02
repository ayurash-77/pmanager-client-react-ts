import { FC, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ErrorList } from '../../components/errors/ErrorList'
import { InfoProjectBlock, InfoProjectTitle } from '../../components/info-elements'
import { ModalWrapper } from '../../components/modal/ModalWrapper'
import { Grid } from '../../components/ui'
import { useAppSelector } from '../../hooks/redux'
import { useTranslate } from '../../hooks/useTranslate'
import { setActiveProjectId } from '../../store/reducers/entities.reducer'
import { setProjectModal } from '../../store/reducers/modals.reducer'
import { useDeleteProjectMutation } from './projects.api'
import { IProject } from './projects.interfaces'

export interface IDeleteProjectModal {
  item: IProject | null
}

export const DeleteProjectModal: FC<IDeleteProjectModal> = ({ item }) => {
  const dispatch = useDispatch()
  const { text } = useTranslate()

  const { projectModal } = useAppSelector(state => state.modals)
  const isOpen = projectModal.mode === 'delete' && projectModal.isOpen

  const [deleteProject, { isError, error, isSuccess, reset }] = useDeleteProjectMutation()

  const onDeleteHandler = e => {
    e.preventDefault()
    deleteProject(item.id)
  }

  const onCancelHandler = useCallback(() => {
    dispatch(setProjectModal({ isOpen: false, mode: null }))
    reset()
  }, [dispatch, reset])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setProjectModal({ isOpen: false, mode: null }))
      dispatch(setActiveProjectId(null))
    }
  }, [dispatch, isSuccess])

  const details = item && (
    <>
      <InfoProjectTitle
        margin={4}
        title={item.title}
        highPriority={item.highPriority}
        align={'center'}
        status={item.status}
      />
      <div style={{ display: 'flex', columnGap: 10, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        <InfoProjectBlock {...item} />
      </div>
    </>
  )

  return (
    <>
      <ModalWrapper
        warning
        type={'type1'}
        size={'md'}
        title={text.actions.deleteProject}
        onSubmitHandler={onDeleteHandler}
        onCancelHandler={onCancelHandler}
        isOpen={isOpen}
      >
        <Grid cols="auto" gap={5}>
          <>
            {details}
            {isError && <ErrorList error={error} />}
          </>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default DeleteProjectModal
