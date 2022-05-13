import { axiosRequest } from '../../utils/axios-utils'
import { IShot } from '../../interfaces/IShot'

export const ShotsService = {
  async getAll(): Promise<IShot[]> {
    const { data } = await axiosRequest({ url: 'shots' })
    return data
  },
  async getByProjectId(projectId): Promise<IShot[]> {
    const { data } = await axiosRequest({ url: `shots?projectId=${projectId}` })
    return data
  },
  async getByReelId(reelId): Promise<IShot[]> {
    const { data } = await axiosRequest({ url: `shots?reelId=${reelId}` })
    return data
  },
}
