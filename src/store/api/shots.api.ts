import { createApi } from '@reduxjs/toolkit/query/react'
import { IShot } from '../../interfaces/IShot'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const shotsApi = createApi({
  reducerPath: 'shotsApi',
  refetchOnFocus: true,
  tagTypes: ['shots'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllShots: build.query<IShot[], void>({
      query: () => ({ url: `shots` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'shots', id })) : []),
    }),
    getShotsByProjectId: build.query<IShot[], number>({
      query: projectId => ({ url: `shots/projects/${projectId}` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'shots', id })) : []),
    }),
    createShot: build.mutation<IShot, IShot>({
      query: shot => ({
        url: 'shots',
        method: 'POST',
        body: shot,
      }),
      invalidatesTags: ['shots'],
    }),
  }),
})

export const { useGetAllShotsQuery, useGetShotsByProjectIdQuery, useCreateShotMutation } = shotsApi
