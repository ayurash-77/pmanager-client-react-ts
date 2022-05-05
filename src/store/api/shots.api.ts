import { IShot } from '../../interfaces/IShot'
import { IShotCreateDto } from '../../interfaces/IShotCreateDto'
import { baseApi } from './base.api'

export const shotsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllShots: build.query<IShot[], void>({
      query: () => ({ url: `shots` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Shots' as const, id })), { type: 'Shots', id: 'LIST' }]
          : [{ type: 'Shots', id: 'LIST' }],
    }),
    getShotsByProjectId: build.query<IShot[], number>({
      query: projectId => ({ url: `shots/projects/${projectId}` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Shots' as const, id })), { type: 'Shots', id: 'LIST' }]
          : [{ type: 'Shots', id: 'LIST' }],
    }),
    getShotsByReelId: build.query<IShot[], number>({
      query: reelId => ({ url: `shots/reels/${reelId}` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Shots' as const, id })), { type: 'Shots', id: 'LIST' }]
          : [{ type: 'Shots', id: 'LIST' }],
    }),
    createShot: build.mutation<IShot, IShotCreateDto>({
      query: shot => ({
        url: 'shots',
        method: 'POST',
        body: shot,
      }),
      invalidatesTags: [{ type: 'Shots', id: 'LIST' }],
    }),
    deleteShot: build.mutation<IShot, number>({
      query: id => ({
        url: `shots/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Shots', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAllShotsQuery,
  useGetShotsByProjectIdQuery,
  useGetShotsByReelIdQuery,
  useCreateShotMutation,
  useDeleteShotMutation,
} = shotsApi
