import { createApi } from '@reduxjs/toolkit/query/react'
import { IReelType } from '../../interfaces/IReelType'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const reelsTypesApi = createApi({
  reducerPath: 'reelsTypesApi',
  refetchOnFocus: true,
  tagTypes: ['reelsTypes'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllReelsTypes: build.query<IReelType[], void>({
      query: () => ({ url: `reels-types` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'reelsTypes', id })) : []),
    }),
    getReelsTypesByProjectId: build.query<IReelType[], number>({
      query: projectId => ({ url: `reels-types/projects/${projectId}` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'reelsTypes', id })) : []),
    }),
    createReelsTypes: build.mutation<IReelType, IReelType>({
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
