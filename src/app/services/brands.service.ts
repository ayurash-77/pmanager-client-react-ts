import { axiosRequest } from '../../utils/axios-utils'
import { IBrand } from '../../interfaces/IBrand'

export const BrandsService = {
  async getAll(): Promise<IBrand[]> {
    const { data } = await axiosRequest({ url: '/brands' })
    return data
  },
}
