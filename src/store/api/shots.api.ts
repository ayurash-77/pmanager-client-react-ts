import { createApi } from '@reduxjs/toolkit/query/react'
import { IShot } from '../../interfaces/IShot'
import { getFetchBaseQuery } from './getFetchBaseQuery'
import { IShotCreateDto } from '../../interfaces/IShotCreateDto'

export const shotsApi = createApi({
  reducerPath: 'shotsApi',
  refetchOnFocus: true,
  tagTypes: ['project', 'reelsTypes', 'reels', 'shots'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllShots: build.query<IShot[], void>({
      query: () => ({ url: `shots` }),
      providesTags: ['project', 'reelsTypes', 'reels', 'shots'],
    }),
    getShotsByProjectId: build.query<IShot[], number>({
      query: projectId => ({ url: `shots/projects/${projectId}` }),
      providesTags: ['project', 'reelsTypes', 'reels', 'shots'],
    }),
    createShot: build.mutation<IShot, IShotCreateDto>({
      query: shot => ({
        url: 'shots',
        method: 'POST',
        body: shot,
      }),
      invalidatesTags: ['project', 'reelsTypes', 'reels', 'shots'],
    }),
    deleteShot: build.mutation<IShot, number>({
      query: id => ({
        url: `shots/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['project', 'reelsTypes', 'reels', 'shots'],
    }),
  }),
})

export const {
  useGetAllShotsQuery,
  useGetShotsByProjectIdQuery,
  useCreateShotMutation,
  useDeleteShotMutation,
} = shotsApi
