import { IAgency } from '../../interfaces/IAgency'
import { baseApi } from './base.api'

export const agenciesApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllAgencies: build.query<IAgency[], void>({
      query: () => ({ url: `agencies` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Agencies' as const, id })), { type: 'Agencies', id: 'LIST' }]
          : [{ type: 'Agencies', id: 'LIST' }],
    }),
    createAgency: build.mutation<IAgency, Partial<IAgency>>({
      query: agency => ({
        url: 'agencies',
        method: 'POST',
        body: agency,
      }),
      invalidatesTags: [{ type: 'Agencies', id: 'LIST' }],
    }),
  }),
})

export const { useGetAllAgenciesQuery, useLazyGetAllAgenciesQuery } = agenciesApi
