import { axiosRequest } from '../../utils/axios-utils'
import { IShot } from '../../interfaces/IShot'
import { IBrief } from '../../interfaces/IBrief'

export const BriefsService = {
  async getAll(): Promise<IBrief[]> {
    const { data } = await axiosRequest({ url: 'briefs' })
    return data
  },
  async getByProjectId(projectId): Promise<IBrief[]> {
    const { data } = await axiosRequest({ url: `briefs?projectId=${projectId}` })
    return data
  },
}
