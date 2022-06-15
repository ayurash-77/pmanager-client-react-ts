import { ModalWrapper } from './ModalWrapper'
import { FC } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui'
import { ErrorList } from '../components/errors/ErrorList'
import { IBrief } from '../interfaces/IBrief'
import { useDeleteBriefMutation } from '../store/api/briefs.api'
import { InfoBriefBlock } from '../components/info-elements'
import { useGetProjectsQuery } from '../store/api/projects.api'

export interface IDeleteBriefModal {
  isOpen: boolean
  closeAction: () => void
  brief?: IBrief | null
}

export const DeleteBriefModal: FC<IDeleteBriefModal> = ({ ...props }) => {
  const { text } = useTranslate()

  const [deleteBrief, { isError, error }] = useDeleteBriefMutation()
  const { refetch: refetchProjects } = useGetProjectsQuery()

  const onSubmitHandler = e => {
    e.preventDefault()
    deleteBrief(props.brief.id)
    refetchProjects()
    props.closeAction()
  }
  const onCancelHandler = () => {
    props.closeAction()
  }

  const details = props.brief && (
    <div style={{ display: 'flex', columnGap: 10, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
      <InfoBriefBlock {...props.brief} />
    </div>
  )

  return (
    <>
      <ModalWrapper
        {...props}
        warning
        type={'type1'}
        size={'md'}
        title={text.actions.deleteBrief}
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

export default DeleteBriefModal
