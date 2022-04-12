import { createApi } from '@reduxjs/toolkit/query/react'
import { IClient } from '../../interfaces/IClient'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  refetchOnFocus: true,
  tagTypes: ['Clients'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllClients: build.query<IClient[], void>({
      query: () => ({ url: `clients` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Clients' as const, id })), { type: 'Clients', id: 'LIST' }]
          : [{ type: 'Clients', id: 'LIST' }],
    }),
    createClient: build.mutation<IClient, IClient>({
      query: client => ({
        url: 'clients',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
    }),
  }),
})

export const { useGetAllClientsQuery, useLazyGetAllClientsQuery } = clientsApi
