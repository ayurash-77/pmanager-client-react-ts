import { axiosRequest } from '../../utils/axios-utils'
import { IProject } from '../../interfaces/IProject'

export const ProjectsService = {
  async getAll(): Promise<IProject[]> {
    const { data } = await axiosRequest({ url: '/projects' })
    return data
  },
  async getById(projectId): Promise<IProject> {
    const { data } = await axiosRequest({ url: `/projects/${projectId}` })
    return data
  },
}
