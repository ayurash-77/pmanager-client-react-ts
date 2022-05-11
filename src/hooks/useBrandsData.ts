import { useQuery } from 'react-query'
import { IBrand } from '../interfaces/IBrand'
import { BrandsService } from '../app/services/brands.service'

export const useGetBrands = () => {
  return useQuery<IBrand[], Error>('brands', BrandsService.getAll)
}
