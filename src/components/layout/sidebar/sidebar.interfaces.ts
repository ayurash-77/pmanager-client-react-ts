import { IProject } from '../../../entities/projects/projects.interfaces'

export interface ISidebar {
  show?: boolean
  project: IProject
  isLoadingProject?: boolean
}
