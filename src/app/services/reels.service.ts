import { axiosRequest } from '../../utils/axios-utils'
import { IReel } from '../../interfaces/IReel'

export const ReelsService = {
  async getAll() {
    const { data } = await axiosRequest({ url: 'reels' })
    return data
  },

  async getByProjectId(projectId): Promise<IReel[]> {
    const { data } = await axiosRequest({ url: `reels?projectId=${projectId}` })
    return data
  },

  async update(reelData: IReel): Promise<IReel> {
    const { data } = await axiosRequest({ url: `reels/${reelData.id}`, method: 'PUT', data: reelData })
    return data
  },
}
