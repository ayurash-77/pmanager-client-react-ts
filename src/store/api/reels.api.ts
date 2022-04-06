import { createApi } from '@reduxjs/toolkit/query/react'
import { IReel } from '../../interfaces/IReel'
import { IReelCreateDto } from '../../interfaces/IReelCreateDto'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const reelsApi = createApi({
  reducerPath: 'reelsApi',
  refetchOnFocus: true,
  tagTypes: ['project', 'reelsTypes', 'reels', 'shots'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllReels: build.query<IReel[], void>({
      query: () => ({ url: `reels` }),
      providesTags: ['project', 'reelsTypes', 'reels', 'shots'],
    }),
    getReelsByProjectId: build.query<IReel[], number>({
      query: projectId => ({ url: `reels/projects/${projectId}` }),
      providesTags: ['project', 'reelsTypes', 'reels', 'shots'],
    }),
    getReelById: build.query<IReel, number>({
      query: id => ({ url: `reels/${id}` }),
      providesTags: ['project', 'reelsTypes', 'reels', 'shots'],
    }),
    createReel: build.mutation<IReel, IReelCreateDto>({
      query: reel => ({
        url: 'reels',
        method: 'POST',
        body: reel,
      }),
      invalidatesTags: ['project', 'reelsTypes', 'reels', 'shots'],
    }),
    updateReel: build.mutation<IReel, Partial<IReel>>({
      query: reel => ({
        url: `reels/${reel.id}`,
        method: 'PATCH',
        body: reel,
      }),
      invalidatesTags: ['project', 'reelsTypes', 'reels', 'shots'],
    }),
    deleteReel: build.mutation<IReel, number>({
      query: id => ({
        url: `reels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['project', 'reelsTypes', 'reels', 'shots'],
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
