import { createApi } from '@reduxjs/toolkit/query/react'
import { IReelsType } from '../../interfaces/IReelsType'
import { getFetchBaseQuery } from './getFetchBaseQuery'
import { IReelsTypeCreateDto } from '../../interfaces/IReelsTypeCreateDto'

export const reelsTypesApi = createApi({
  reducerPath: 'reelsTypesApi',
  // refetchOnFocus: true,
  tagTypes: ['reelsTypes'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllReelsTypes: build.query<IReelsType[], void>({
      query: () => ({ url: `reels-types` }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'reelsTypes' as const, id })),
              { type: 'reelsTypes', id: 'LIST' },
            ]
          : [{ type: 'reelsTypes', id: 'LIST' }],
    }),
    getReelsTypesByProjectId: build.query<IReelsType[], number>({
      query: projectId => ({ url: `reels-types/projects/${projectId}` }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'reelsTypes' as const, id })),
              { type: 'reelsTypes', id: 'LIST' },
            ]
          : [{ type: 'reelsTypes', id: 'LIST' }],
    }),
    createReelsTypes: build.mutation<IReelsType, IReelsTypeCreateDto>({
      query: reelsType => ({
        url: 'reels-types',
        method: 'POST',
        body: reelsType,
      }),
      invalidatesTags: [{ type: 'reelsTypes', id: 'LIST' }],
    }),
    deleteReelsType: build.mutation<IReelsType, number>({
      query: id => ({
        url: `reels-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'reelsTypes', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAllReelsTypesQuery,
  useGetReelsTypesByProjectIdQuery,
  useCreateReelsTypesMutation,
  useDeleteReelsTypeMutation,
} = reelsTypesApi
