import { createApi } from '@reduxjs/toolkit/query/react'
import { IBrand } from '../../interfaces/IBrand'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const brandsApi = createApi({
  reducerPath: 'brandsApi',
  refetchOnFocus: true,
  tagTypes: ['brands'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllBrands: build.query<IBrand[], void>({
      query: () => ({ url: `brands` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'brands', id })) : []),
    }),
    createBrand: build.mutation<IBrand, IBrand>({
      query: brand => ({
        url: 'brands',
        method: 'POST',
        body: brand,
      }),
      invalidatesTags: ['brands'],
    }),
  }),
})

export const { useGetAllBrandsQuery, useCreateBrandMutation } = brandsApi
