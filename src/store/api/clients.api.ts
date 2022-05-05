import { IClient } from '../../interfaces/IClient'
import { baseApi } from './base.api'

export const clientsApi = baseApi.injectEndpoints({
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
