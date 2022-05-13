import { axiosRequest } from '../../utils/axios-utils'
import { IClient } from '../../interfaces/IClient'

export const ClientsService = {
  async getAll(): Promise<IClient[]> {
    const { data } = await axiosRequest({ url: 'clients' })
    return data
  },
}
