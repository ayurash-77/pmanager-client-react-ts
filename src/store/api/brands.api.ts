import { IBrand } from '../../interfaces/IBrand'
import { baseApi } from './base.api'
import { providesList } from '../../utils/provides-list'

export const brandsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getBrands: build.query<IBrand[], void>({
      query: () => ({ url: `brands` }),
      providesTags: result => providesList(result, 'Brands'),
    }),
    getBrand: build.query<IBrand, number>({
      query: id => ({ url: `brands/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Brands', id }],
    }),
    createBrand: build.mutation<IBrand, Partial<IBrand>>({
      query: data => ({ url: 'brands', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Brands', id: 'LIST' }],
    }),
    deleteBrand: build.mutation<IBrand, number>({
      query: id => ({ url: `brands/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Brands', id: 'LIST' }],
    }),
  }),
})

export const { useGetBrandsQuery } = brandsApi
