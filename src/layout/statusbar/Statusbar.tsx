import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import styled from 'styled-components'
import {
  InfoDeadline,
  InfoProgress,
  InfoProjectTitle,
  InfoStartAt,
  InfoStatus,
} from '../../components/info-elements'
import { InfoDoneAt } from '../../components/info-elements/InfoDoneAt'
import { IProject } from '../../interfaces/IProject'
import { useGetProjectByIdQuery } from '../../store/api/projects.api'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  project: IProject
  isFetchingProject: boolean
}

const Container = styled.div`
  padding: 0 6px;
  min-height: 30px;
  display: flex;
  align-items: center;
  background-color: var(--header-bg);
  box-shadow: 0 0 3px var(--button-shadow);
`
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--header-bg);
  gap: 20px;
`

const InfoElement = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: var(--text-low);
  width: 100%;
`

export const Statusbar: FC<Props> = ({ project, isFetchingProject }) => {
  const projectInfo = (
    <InfoContainer>
      <InfoElement>
        <InfoProjectTitle
          title={project?.title}
          highPriority={project?.highPriority}
          status={project?.status}
        />
      </InfoElement>
      <InfoElement>
        <InfoStartAt startAt={project?.startAt} />
      </InfoElement>
      <InfoElement>
        <InfoDeadline deadline={project?.deadline} />
      </InfoElement>
      <InfoElement>
        <InfoStatus status={project?.status} />
      </InfoElement>
      {project?.status.code === 5 && (
        <InfoElement>
          <InfoDoneAt doneAt={project?.doneAt} />
        </InfoElement>
      )}
      <InfoElement>
        <InfoProgress progress={project?.progress} status={project?.status} width={80} withValue />
      </InfoElement>
    </InfoContainer>
  )

  return (
    <>
      <Container>{project && projectInfo}</Container>
    </>
  )
}

export default Statusbar
