import { FC } from 'react'
import styled from 'styled-components'
import { IProject } from '../../../interfaces/IProject'
import { InfoDeadline, InfoProgress, InfoProjectTitle, InfoStartAt, InfoStatus } from '../../info-elements'
import { InfoDoneAt } from '../../info-elements/InfoDoneAt'

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

interface IStatusbar {
  project: IProject
}

export const Statusbar: FC<IStatusbar> = ({ project }) => {
  const projectInfo = project && (
    <InfoContainer>
      <InfoElement>
        <InfoProjectTitle title={project.title} highPriority={project.highPriority} status={project.status} />
      </InfoElement>
      <InfoElement>
        <InfoStartAt startAt={project.startAt} />
      </InfoElement>
      <InfoElement>
        <InfoDeadline deadline={project.deadline} />
      </InfoElement>
      <InfoElement>
        <InfoStatus status={project.status} />
      </InfoElement>
      {project.status?.code === 5 && (
        <InfoElement>
          <InfoDoneAt doneAt={project.doneAt} />
        </InfoElement>
      )}
      <InfoElement>
        <InfoProgress progress={project.progress} status={project.status} width={80} withValue />
      </InfoElement>
    </InfoContainer>
  )

  return <Container>{projectInfo}</Container>
}

export default Statusbar
