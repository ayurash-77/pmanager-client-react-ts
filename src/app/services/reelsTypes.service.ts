import { axiosRequest } from '../../utils/axios-utils'
import { IReel } from '../../interfaces/IReel'
import { IReelsType } from '../../interfaces/IReelsType'
import { IReelsTypeCreateDto } from '../../interfaces/IReelsTypeCreateDto'

export const ReelsTypesService = {
  async getAll() {
    const { data } = await axiosRequest({ url: 'reels-types' })
    return data
  },

  async getByProjectId(projectId): Promise<IReelsType[]> {
    const { data } = await axiosRequest({ url: `reels-types?projectId=${projectId}` })
    return data
  },

  async getById(reelsTypeId): Promise<IReelsType> {
    const { data } = await axiosRequest({ url: `reels-types/${reelsTypeId}` })
    return data
  },

  async create(reelsTypeData: IReelsTypeCreateDto): Promise<IReelsType> {
    const { data } = await axiosRequest({ url: `reels-types2`, method: 'POST', data: reelsTypeData })
    return data
  },

  async update(reelsTypeData: IReelsType): Promise<IReelsType> {
    const { data } = await axiosRequest({
      url: `reels-types/${reelsTypeData.id}`,
      method: 'PUT',
      data: reelsTypeData,
    })
    return data
  },

  async delete(reelsTypeId: number): Promise<IReelsType> {
    const { data } = await axiosRequest({ url: `reels-types/${reelsTypeId}`, method: 'DELETE' })
    return data
  },
}
