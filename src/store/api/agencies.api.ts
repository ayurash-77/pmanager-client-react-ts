import { createApi } from '@reduxjs/toolkit/query/react'
import { IAgency } from '../../interfaces/IAgency'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const agenciesApi = createApi({
  reducerPath: 'agenciesApi',
  refetchOnFocus: true,
  tagTypes: ['agencies'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllAgencies: build.query<IAgency[], void>({
      query: () => ({ url: `agencies` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'agencies', id })) : []),
    }),
    createAgency: build.mutation<IAgency, IAgency>({
      query: agency => ({
        url: 'agencies',
        method: 'POST',
        body: agency,
      }),
      invalidatesTags: ['agencies'],
    }),
  }),
})

export const { useGetAllAgenciesQuery, useCreateAgencyMutation } = agenciesApi
