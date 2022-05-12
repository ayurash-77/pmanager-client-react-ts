import { useMutation, useQuery, useQueryClient } from 'react-query'
import { IProject } from '../../interfaces/IProject'
import { ProjectsService } from '../../app/services/projects.service'
import { IPost } from '../../interfaces/IPost'

export const useGetProjects = () => {
  return useQuery<IProject[], Error>('projects', ProjectsService.getAll)
}

export const useGetProject = projectId => {
  return useQuery<IProject, Error>(['project', projectId], () => ProjectsService.getById(projectId), {
    enabled: !!projectId,
    // staleTime: 2000,
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()
  return useMutation<IProject, Error, Partial<IProject>>(ProjectsService.create, {
    onSuccess: async (data: IProject) => {
      queryClient.setQueryData('projects', (oldQueryData: IProject[] | undefined) => {
        return [...oldQueryData, data]
      })
    },
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  return useMutation<IProject, Error, number>(ProjectsService.delete, {
    onSuccess: async (data, variables) => {
      // await queryClient.invalidateQueries('posts')
      queryClient.setQueryData('projects', (oldQueryData: IPost[] | undefined) => {
        return [...oldQueryData.filter(item => item.id !== variables)]
      })
    },
  })
}
