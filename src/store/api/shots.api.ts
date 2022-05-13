import { IShot } from '../../interfaces/IShot'
import { IShotCreateDto } from '../../interfaces/IShotCreateDto'
import { baseApi } from './base.api'

export const shotsApi = baseApi.injectEndpoints({
  endpoints: build => ({
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

export const { useCreateShotMutation, useDeleteShotMutation } = shotsApi
