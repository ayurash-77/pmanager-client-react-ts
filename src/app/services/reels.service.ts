import { axiosRequest } from '../../utils/axios-utils'
import { IReel } from '../../interfaces/IReel'

export const ReelsService = {
  async getAll() {
    const { data } = await axiosRequest({ url: '/reels' })
    return data
  },
  async getByProjectId(projectId): Promise<IReel[]> {
    const { data } = await axiosRequest({ url: `/reels/projects/${projectId}` })
    return data
  },
}
