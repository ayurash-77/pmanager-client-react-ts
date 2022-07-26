import { FC } from 'react'
import { IProject } from '../../../entities/projects/projects.interfaces'
import { InfoDeadline, InfoProgress, InfoProjectTitle, InfoStartAt, InfoStatus } from '../../info-elements'
import { InfoDoneAt } from '../../info-elements/InfoDoneAt'
import css from './Statusbar.module.scss'

interface IStatusbar {
  project: IProject
}

export const Statusbar: FC<IStatusbar> = ({ project }) => {
  const projectInfo = project && (
    <div className={css.main}>
      <div className={css.item}>
        <InfoProjectTitle title={project.title} highPriority={project.highPriority} status={project.status} />
      </div>
      <div className={css.item}>
        <InfoStartAt startAt={project.startAt} />
      </div>
      <div className={css.item}>
        <InfoDeadline deadline={project.deadline} />
      </div>
      <div className={css.item}>
        <InfoStatus status={project.status} />
      </div>
      {project.status?.code === 5 && (
        <div className={css.item}>
          <InfoDoneAt doneAt={project.doneAt} />
        </div>
      )}
      <div className={css.item}>
        <InfoProgress progress={project.progress} status={project.status} width={80} withValue />
      </div>
    </div>
  )

  return <div className={css.container}>{projectInfo}</div>
}

export default Statusbar
