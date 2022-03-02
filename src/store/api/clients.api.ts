import { createApi } from '@reduxjs/toolkit/query/react'
import { IClient } from '../../interfaces/IClient'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  refetchOnFocus: true,
  tagTypes: ['clients'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllClients: build.query<IClient[], void>({
      query: () => ({ url: `clients` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'clients', id })) : []),
    }),
    createClient: build.mutation<IClient, IClient>({
      query: client => ({
        url: 'clients',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: ['clients'],
    }),
  }),
})

export const { useGetAllClientsQuery, useCreateClientMutation } = clientsApi
