import { createApi } from '@reduxjs/toolkit/query/react'
import { IReel } from '../../interfaces/IReel'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const reelsApi = createApi({
  reducerPath: 'reelsApi',
  refetchOnFocus: true,
  tagTypes: ['reels'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllReels: build.query<IReel[], void>({
      query: () => ({ url: `reels` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'reels', id })) : []),
    }),
    getReelsByProjectId: build.query<IReel[], number>({
      query: projectId => ({ url: `reels/projects/${projectId}` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'reels', id })) : []),
    }),
    createReel: build.mutation<IReel, IReel>({
      query: reel => ({
        url: 'reels',
        method: 'POST',
        body: reel,
      }),
      invalidatesTags: ['reels'],
    }),
  }),
})

export const { useGetAllReelsQuery, useGetReelsByProjectIdQuery, useCreateReelMutation } = reelsApi
