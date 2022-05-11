import { IBrand } from '../../interfaces/IBrand'
import { baseApi } from './base.api'

export const brandsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllBrands: build.query<IBrand[], void>({
      query: () => ({ url: `brands` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Brands' as const, id })), { type: 'Brands', id: 'LIST' }]
          : [{ type: 'Brands', id: 'LIST' }],
    }),
    createBrand: build.mutation<IBrand, Partial<IBrand>>({
      query: brand => ({
        url: 'brands',
        method: 'POST',
        body: brand,
      }),
      invalidatesTags: [{ type: 'Brands', id: 'LIST' }],
    }),
  }),
})

export const { useLazyGetAllBrandsQuery } = brandsApi
