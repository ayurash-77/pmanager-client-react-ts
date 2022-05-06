import { useQuery } from 'react-query'
import { IProject } from '../interfaces/IProject'
import { ProjectsService } from '../app/services/projects.service'

export const useProjectData = projectId => {
  return useQuery<IProject, Error>('projects', () => ProjectsService.getById(projectId))
}