import { axiosRequest } from '../../utils/axios-utils'
import { IShot } from '../../interfaces/IShot'

export const ShotsService = {
  async getAll() {
    const { data } = await axiosRequest({ url: '/shots' })
    return data
  },
  async getByProjectId(projectId): Promise<IShot[]> {
    const { data } = await axiosRequest({ url: `/shots/projects/${projectId}` })
    return data
  },
}
