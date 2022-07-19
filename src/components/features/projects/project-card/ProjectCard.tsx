import cn from 'classnames'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { Clapper } from '../../../../assets/thumbnails/thumbnails'
import { apiBaseUrl } from '../../../../constants/env'
import { useAppSelector } from '../../../../hooks/redux'
import { IProject } from '../../../../interfaces/IProject'
import { IProjectViewFilter } from '../../../../interfaces/IProjectViewFilter'
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
} from '../../../info-elements'
import { Image } from '../../../ui'
import { ProjectCardContainer } from './ProjectCard.styles'

export interface IProjectCard extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isSelected: boolean
  project: IProject
}

export const ProjectCard: FC<IProjectCard> = props => {
  const { isSelected, project, ...rest } = props
  const imageSrc = `${apiBaseUrl}/root/${project.homeDir}/.pmdata/projectThumbnail.jpg`
  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)
  const viewFilter: IProjectViewFilter = filterBar.filters[projectsViewMode]

  return (
    <div {...rest}>
      <ProjectCardContainer>
        <div className={cn('imageContainer', { selected: isSelected })}>
          <Image src={imageSrc} alt={project.title} fallback={<Clapper />} />
        </div>
        <InfoProgress progress={project.progress} status={project.status} height={3} withValue={false} />

        <div className={cn('infoContainer', { selected: isSelected })}>
          <InfoProjectTitle
            title={project.title}
            highPriority={project.highPriority}
            status={project.status}
          />

          <div className={'grid grid-cols-2'}>
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
    </div>
  )
}

export default ProjectCard
