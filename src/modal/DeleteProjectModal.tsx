import { ModalWrapper } from './ModalWrapper'
import { FC } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui'
import { InfoProjectTitle } from '../components/info-elements'
import { IProject } from '../interfaces/IProject'
import { InfoProjectBlock } from '../components/info-elements'
import { useDeleteProjectMutation } from '../store/api/projects.api'
import { ErrorList } from '../components/errors/ErrorList'

export interface IDeleteProjectModal {
  isOpen: boolean
  closeAction: () => void
  project?: IProject | null
}

export const DeleteProjectModal: FC<IDeleteProjectModal> = ({ ...props }) => {
  const { text } = useTranslate()

  const [deleteProject, { isError, error }] = useDeleteProjectMutation()

  const onSubmitHandler = e => {
    e.preventDefault()
    deleteProject(props.project.id)
    props.closeAction()
  }
  const onCancelHandler = () => {
    props.closeAction()
  }

  const details = props.project && (
    <>
      <InfoProjectTitle
        margin={4}
        title={props.project.title}
        highPriority={props.project.highPriority}
        align={'center'}
        status={props.project.status}
      />
      <div style={{ display: 'flex', columnGap: 10, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        <InfoProjectBlock {...props.project} />
      </div>
    </>
  )

  return (
    <>
      <ModalWrapper
        {...props}
        warning
        type={'type1'}
        size={'md'}
        title={text.actions.deleteProject}
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
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
