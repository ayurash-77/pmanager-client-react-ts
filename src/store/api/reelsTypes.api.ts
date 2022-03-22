import { createApi } from '@reduxjs/toolkit/query/react'
import { IReelsType } from '../../interfaces/IReelsType'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const reelsTypesApi = createApi({
  reducerPath: 'reelsTypesApi',
  refetchOnFocus: true,
  tagTypes: ['reelsTypes'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllReelsTypes: build.query<IReelsType[], void>({
      query: () => ({ url: `reels-types` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'reelsTypes', id })) : []),
    }),
    getReelsTypesByProjectId: build.query<IReelsType[], number>({
      query: projectId => ({ url: `reels-types/projects/${projectId}` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'reelsTypes', id })) : []),
    }),
    createReelsTypes: build.mutation<IReelsType, IReelsType>({
      query: reelsType => ({
        url: 'reels-types',
        method: 'POST',
        body: reelsType,
      }),
      invalidatesTags: ['reelsTypes'],
    }),
  }),
})

export const { useGetAllReelsTypesQuery, useGetReelsTypesByProjectIdQuery, useCreateReelsTypesMutation } =
  reelsTypesApi
