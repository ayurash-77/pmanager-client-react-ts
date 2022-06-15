import { IShot } from '../../interfaces/IShot'
import { IShotCreateDto } from '../../interfaces/IShotCreateDto'
import { baseApi } from './base.api'
import { providesList } from '../../utils/provides-list'

export const shotsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getShots: build.query<IShot[], number>({
      query: projectId => ({ url: `shots?projectId=${projectId}` }),
      providesTags: result => providesList(result, 'Shots'),
    }),
    createShot: build.mutation<IShot, IShotCreateDto>({
      query: body => ({ url: 'shots', method: 'POST', body: body }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Shots', id: 'LIST' },
        { type: 'Reels', id: arg.reelId },
      ],
    }),

    deleteShot: build.mutation<IShot, number>({
      query: id => ({ url: `shots/${id}`, method: 'DELETE' }),
      invalidatesTags: [
        { type: 'Shots', id: 'LIST' },
        { type: 'Reels', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetShotsQuery, useCreateShotMutation, useDeleteShotMutation } = shotsApi
