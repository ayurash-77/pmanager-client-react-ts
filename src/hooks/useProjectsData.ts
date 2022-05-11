import { useQuery } from 'react-query'
import { IProject } from '../interfaces/IProject'
import { ProjectsService } from '../app/services/projects.service'

export const useGetProjects = () => {
  return useQuery<IProject[], Error>('projects', () => ProjectsService.getAll())
}

export const useGetProject = projectId => {
  return useQuery<IProject, Error>(['project', projectId], () => ProjectsService.getById(projectId), {
    enabled: !!projectId,
    staleTime: 2000,
  })
}
