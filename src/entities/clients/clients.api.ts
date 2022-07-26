import { baseApi } from '../../store/base.api'
import { providesList } from '../../utils/provides-list'
import { IClient } from './clients.interfaces'

export const clientsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getClients: build.query<IClient[], void>({
      query: () => ({ url: `clients` }),
      providesTags: result => providesList(result, 'Clients'),
    }),
    getClient: build.query<IClient, number>({
      query: id => ({ url: `clients/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Clients', id }],
    }),
    createClient: build.mutation<IClient, Partial<IClient>>({
      query: data => ({ url: 'clients', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
    }),
    deleteClient: build.mutation<IClient, number>({
      query: id => ({ url: `clients/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
    }),
  }),
})

export const { useGetClientsQuery } = clientsApi
