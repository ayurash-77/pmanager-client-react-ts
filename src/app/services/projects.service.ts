import { axiosRequest } from '../../utils/axios-utils'

export const ProjectsService = {
  async getAll() {
    const { data } = await axiosRequest({ url: '/projects' })
    return data
  },
  async getById(projectId) {
    const { data } = await axiosRequest({ url: `/projects/${projectId}` })
    return data
  },
}
