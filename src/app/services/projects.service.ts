import { axiosRequest } from '../../utils/axios-utils'
import { IProject } from '../../interfaces/IProject'

export const ProjectsService = {
  async getAll(): Promise<IProject[]> {
    const { data } = await axiosRequest({ url: 'projects' })
    return data
  },
  async getById(projectId: number): Promise<IProject> {
    const { data } = await axiosRequest({ url: `projects/${projectId}` })
    return data
  },
  async create(projectData: Partial<IProject>): Promise<IProject> {
    const { data } = await axiosRequest({ url: 'projects', method: 'POST', data: projectData })
    return data
  },
  async delete(projectId: number): Promise<IProject> {
    const { data } = await axiosRequest({ url: `projects/${projectId}`, method: 'DELETE' })
    return data
  },
}
