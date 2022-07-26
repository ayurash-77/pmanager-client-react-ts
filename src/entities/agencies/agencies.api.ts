import { providesList } from 'utils/provides-list'
import { baseApi } from 'store/base.api'
import { IAgency } from './agencies.interfaces'

export const agenciesApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAgencies: build.query<IAgency[], void>({
      query: () => ({ url: `agencies` }),
      providesTags: result => providesList(result, 'Agencies'),
    }),
    getAgency: build.query<IAgency, number>({
      query: id => ({ url: `agencies/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Agencies', id }],
    }),
    createAgency: build.mutation<IAgency, Partial<IAgency>>({
      query: data => ({ url: 'agencies', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Agencies', id: 'LIST' }],
    }),
    deleteAgency: build.mutation<IAgency, number>({
      query: id => ({ url: `agencies/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Agencies', id: 'LIST' }],
    }),
  }),
})

export const { useGetAgenciesQuery } = agenciesApi
