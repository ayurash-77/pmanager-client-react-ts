import { FC } from 'react'
import ProjectCard from '../project-card/ProjectCard'
import styled from 'styled-components'
import { IProject } from '../../interfaces/IProject'
import { useAppSelector } from '../../hooks/redux'

const ContainerGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, 160px);
  justify-content: space-evenly;
`

interface IProjectsGrid {
  projects: IProject[]
  onProjectClickHandler: (e) => void
  onProjectDoubleClickHandler: (e) => void
}

export const ProjectsGrid: FC<IProjectsGrid> = props => {
  const { projects, onProjectClickHandler, onProjectDoubleClickHandler } = props
  const { activeProjectId } = useAppSelector(state => state.entities)
  const ProjectGridContent = (
    <ContainerGrid>
      {projects.map(item => (
        <ProjectCard
          key={item.id}
          isSelected={item.id === activeProjectId}
          project={item}
          onClick={() => onProjectClickHandler(item)}
          onDoubleClick={() => onProjectDoubleClickHandler(item)}
        />
      ))}
    </ContainerGrid>
  )
  return <>{ProjectGridContent}</>
}
