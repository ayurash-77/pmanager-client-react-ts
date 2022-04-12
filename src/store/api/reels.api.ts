import { createApi } from '@reduxjs/toolkit/query/react'
import { IReel } from '../../interfaces/IReel'
import { IReelCreateDto } from '../../interfaces/IReelCreateDto'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const reelsApi = createApi({
  reducerPath: 'reelsApi',
  refetchOnFocus: true,
  tagTypes: ['Reels'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllReels: build.query<IReel[], void>({
      query: () => ({ url: `reels` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Reels' as const, id })), { type: 'Reels', id: 'LIST' }]
          : [{ type: 'Reels', id: 'LIST' }],
    }),
    getReelsByProjectId: build.query<IReel[], number>({
      query: projectId => ({ url: `reels/projects/${projectId}` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Reels' as const, id })), { type: 'Reels', id: 'LIST' }]
          : [{ type: 'Reels', id: 'LIST' }],
    }),
    getReelById: build.query<IReel, number>({
      query: id => ({ url: `reels/${id}` }),
      providesTags: (result, error, id) => [{ type: 'Reels', id }],
    }),
    createReel: build.mutation<IReel, IReelCreateDto>({
      query: reel => ({
        url: 'reels',
        method: 'POST',
        body: reel,
      }),
      invalidatesTags: [{ type: 'Reels', id: 'LIST' }],
    }),
    updateReel: build.mutation<IReel, Partial<IReel>>({
      query: reel => ({
        url: `reels/${reel.id}`,
        method: 'PATCH',
        body: reel,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Reels', id: arg.id }],
    }),
    deleteReel: build.mutation<IReel, number>({
      query: id => ({
        url: `reels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Reels', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAllReelsQuery,
  useGetReelsByProjectIdQuery,
  useCreateReelMutation,
  useDeleteReelMutation,
  useGetReelByIdQuery,
  useUpdateReelMutation,
} = reelsApi
