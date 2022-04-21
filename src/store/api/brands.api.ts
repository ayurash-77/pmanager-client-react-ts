import { createApi } from '@reduxjs/toolkit/query/react'
import { IBrand } from '../../interfaces/IBrand'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const brandsApi = createApi({
  reducerPath: 'brandsApi',
  // refetchOnFocus: true,
  tagTypes: ['Brands'],
  baseQuery: getFetchBaseQuery(),
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

export const { useGetAllBrandsQuery, useLazyGetAllBrandsQuery } = brandsApi
