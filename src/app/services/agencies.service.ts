import { axiosRequest } from '../../utils/axios-utils'
import { IAgency } from '../../interfaces/IAgency'

export const AgenciesService = {
  async getAll(): Promise<IAgency[]> {
    const { data } = await axiosRequest({ url: '/agencies' })
    return data
  },
}
