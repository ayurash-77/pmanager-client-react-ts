import { IProject } from '../../interfaces/IProject'
import { IProjectViewFilter } from '../../interfaces/IProjectViewFilter'
import { FC } from 'react'
import { Clapper } from '../../assets/thumbnails/thumbnails'
import * as s from './ProejctCarg.styles'
import Image from '../ui/Image'
import {
  InfoAgency,
  InfoBrand,
  InfoClient,
  InfoCreatedAt,
  InfoDeadline,
  InfoGrid,
  InfoOwner,
  InfoProgress,
  InfoProjectTitle,
  InfoStartAt,
  InfoStatus,
} from '../info-elements'
import { apiBaseUrl } from '../../constants/env'
import cn from 'classnames'

interface IProjectCard {
  selected: boolean
  item: IProject
  viewFilter: IProjectViewFilter
  onClick?: () => void
  onDoubleClick?: () => void
}

export const ProjectCard: FC<IProjectCard> = ({ ...props }) => {
  const imageSrc = `${apiBaseUrl}/root/${props.item.homeDir}/.pmdata/projectThumbnail.jpg`

  return (
    <s.Container {...props}>
      <div className={cn('imageContainer', { selected: props.selected })}>
        <Image src={imageSrc} alt={props.item.title} fallback={<Clapper />} />
      </div>
      <InfoProgress progress={props.item.progress} status={props.item.status} height={3} withValue={false} />

      <div className={cn('infoContainer', { selected: props.selected })}>
        <InfoProjectTitle
          title={props.item.title}
          highPriority={props.item.highPriority}
          status={props.item.status}
        />
        <InfoGrid>
          {props.viewFilter.brand && <InfoBrand brand={props.item.brand} />}
          {props.viewFilter.client && <InfoClient client={props.item.client} />}
          {props.viewFilter.agency && <InfoAgency agency={props.item.agency} />}
          {props.viewFilter.createdAt && <InfoCreatedAt createdAt={props.item.createdAt} />}
          {props.viewFilter.startAt && <InfoStartAt startAt={props.item.startAt} />}
          {props.viewFilter.deadline && <InfoDeadline deadline={props.item.deadline} />}
          {props.viewFilter.status && <InfoStatus status={props.item.status} />}
          {props.viewFilter.owner && <InfoOwner owner={props.item.owner} />}
        </InfoGrid>
      </div>
    </s.Container>
  )
}

export default ProjectCard
