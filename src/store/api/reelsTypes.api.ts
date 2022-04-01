import { createApi } from '@reduxjs/toolkit/query/react'
import { IReelsType } from '../../interfaces/IReelsType'
import { getFetchBaseQuery } from './getFetchBaseQuery'
import { IReelsTypeCreateDto } from '../../interfaces/IReelsTypeCreateDto'

export const reelsTypesApi = createApi({
  reducerPath: 'reelsTypesApi',
  refetchOnFocus: true,
  tagTypes: ['project', 'reelsTypes', 'reels'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllReelsTypes: build.query<IReelsType[], void>({
      query: () => ({ url: `reels-types` }),
      providesTags: ['reelsTypes', 'project'],
    }),
    getReelsTypesByProjectId: build.query<IReelsType[], number>({
      query: projectId => ({ url: `reels-types/projects/${projectId}` }),
      providesTags: ['project', 'reelsTypes', 'reels'],
    }),
    createReelsTypes: build.mutation<IReelsType, IReelsTypeCreateDto>({
      query: reelsType => ({
        url: 'reels-types',
        method: 'POST',
        body: reelsType,
      }),
      invalidatesTags: ['project', 'reelsTypes', 'reels'],
    }),
    deleteReelsType: build.mutation<IReelsType, number>({
      query: id => ({
        url: `reels-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['project', 'reelsTypes', 'reels'],
    }),
  }),
})

export const {
  useGetAllReelsTypesQuery,
  useGetReelsTypesByProjectIdQuery,
  useCreateReelsTypesMutation,
  useDeleteReelsTypeMutation,
} = reelsTypesApi
