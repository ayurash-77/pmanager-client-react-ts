import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { useAppSelector } from '../../../hooks/redux'
import ProjectCard from '../project-card/ProjectCard'
import { IProject } from '../projects.interfaces'
import css from './ProjectsGrid.module.scss'

interface IProjectsGrid extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  projects: IProject[]
  onClickHandler: (e, id) => void
}

export const ProjectsGrid: FC<IProjectsGrid> = props => {
  const { projects, onClickHandler } = props
  const { activeProjectId } = useAppSelector(state => state.entities)
  const ProjectGridContent = (
    <div className={css.container}>
      {projects.map(item => (
        <ProjectCard
          key={item.id}
          onClick={e => onClickHandler(e, item.id)}
          onContextMenu={e => onClickHandler(e, item.id)}
          isSelected={item.id === activeProjectId}
          project={item}
        />
      ))}
    </div>
  )
  return <>{ProjectGridContent}</>
}
