import { IProject } from '../../interfaces/IProject'
import { IProjectViewFilter } from '../../interfaces/IProjectViewFilter'
import { FC } from 'react'
import { Clapper } from '../../assets/thumbnails/thumbnails'
import Image from '../ui/Image'
import {
  InfoAgency,
  InfoBrand,
  InfoClient,
  InfoCreatedAt,
  InfoDeadline,
  InfoOwner,
  InfoProgress,
  InfoProjectTitle,
  InfoStartAt,
  InfoStatus,
} from '../info-elements'
import { apiBaseUrl } from '../../constants/env'
import { ProjectCardContainer } from './ProjectCard.styles'
import cn from 'classnames'
import { useAppSelector } from '../../hooks/redux'

export interface IProjectCard {
  isSelected: boolean
  project: IProject
  onClick: () => void
  onDoubleClick: () => void
}

export const ProjectCard: FC<IProjectCard> = props => {
  const { isSelected, project } = props
  const imageSrc = `${apiBaseUrl}/root/${project.homeDir}/.pmdata/projectThumbnail.jpg`
  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)
  const viewFilter: IProjectViewFilter = filterBar.filters[projectsViewMode]

  return (
    <ProjectCardContainer {...props}>
      <div className={cn('imageContainer', { selected: isSelected })}>
        <Image src={imageSrc} alt={project.title} fallback={<Clapper />} />
      </div>
      <InfoProgress progress={project.progress} status={project.status} height={3} withValue={false} />

      <div className={cn('infoContainer', { selected: isSelected })}>
        <InfoProjectTitle title={project.title} highPriority={project.highPriority} status={project.status} />
        <div className={'grid info'}>
          {viewFilter.brand && <InfoBrand brand={project.brand} />}
          {viewFilter.client && <InfoClient client={project.client} />}
          {viewFilter.agency && <InfoAgency agency={project.agency} />}
          {viewFilter.createdAt && <InfoCreatedAt createdAt={project.createdAt} />}
          {viewFilter.startAt && <InfoStartAt startAt={project.startAt} />}
          {viewFilter.deadline && <InfoDeadline deadline={project.deadline} />}
          {viewFilter.status && <InfoStatus status={project.status} />}
          {viewFilter.owner && <InfoOwner owner={project.owner} />}
        </div>
      </div>
    </ProjectCardContainer>
  )
}

export default ProjectCard
