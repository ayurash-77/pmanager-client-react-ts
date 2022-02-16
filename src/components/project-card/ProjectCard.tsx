import { IProject } from '../../interfaces/IProject'
import { IProjectViewFilter } from '../../interfaces/IProjectViewFilter'
import { FC } from 'react'
import { Clapper } from '../../assets/thumbnails/thumbnails'
import * as s from './ProejctCarg.styles'
import * as ie from '../info-elements/InfoElements.styles'
import Image from '../Image'
import {
  InfoAgency,
  InfoBrand,
  InfoClient,
  InfoDeadline,
  InfoOwner,
  InfoProgress,
  InfoProjectTitle,
  InfoStartAt,
  InfoStatus,
} from '../info-elements/InfoElements'

interface IProjectCard extends s.IProjectCardStyled {
  item: IProject
  viewFilter: IProjectViewFilter
  onClick?: () => void
}

export const ProjectCard: FC<IProjectCard> = ({ ...props }) => {
  const imageSrc = `root/${props.item.homeDir}/.pmdata/projectThumbnail.jpg`

  return (
    <s.Container {...props}>
      <div className={'imageContainer'}>
        <Image src={imageSrc} alt={props.item.title} fallback={<Clapper />} />
        {/* <Img src={imageSrc} alt={props.item.title} unloader={<Clapper />} loader={<Loader size={32} />} /> */}
      </div>
      <InfoProgress progress={props.item.progress} status={props.item.status} withValue={false} />

      <div className={'infoContainer'}>
        <InfoProjectTitle
          title={props.item.title}
          highPriority={props.item.highPriority}
          status={props.item.status}
        />
        <ie.InfoGrid>
          {props.viewFilter.brand && <InfoBrand brand={props.item.brand} />}
          {props.viewFilter.client && <InfoClient client={props.item.client} />}
          {props.viewFilter.agency && <InfoAgency agency={props.item.agency} />}
          {props.viewFilter.startAt && <InfoStartAt startAt={props.item.startAt} />}
          {props.viewFilter.deadline && <InfoDeadline deadline={props.item.deadline} />}
          {props.viewFilter.status && <InfoStatus status={props.item.status} />}
          {props.viewFilter.owner && <InfoOwner owner={props.item.owner} />}
        </ie.InfoGrid>
      </div>
    </s.Container>
  )
}

export default ProjectCard
