import { IReelsType } from '../../interfaces/IReelsType'
import { IReelsTypeCreateDto } from '../../interfaces/IReelsTypeCreateDto'
import { baseApi } from './base.api'

export const reelsTypesApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllReelsTypes: build.query<IReelsType[], void>({
      query: () => ({ url: `reels-types` }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'ReelsTypes' as const, id })),
              { type: 'ReelsTypes', id: 'LIST' },
            ]
          : [{ type: 'ReelsTypes', id: 'LIST' }],
    }),
    getReelsTypesByProjectId: build.query<IReelsType[], number>({
      query: projectId => ({ url: `reels-types/projects/${projectId}` }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'ReelsTypes' as const, id })),
              { type: 'ReelsTypes', id: 'LIST' },
            ]
          : [{ type: 'ReelsTypes', id: 'LIST' }],
    }),
    createReelsTypes: build.mutation<IReelsType, IReelsTypeCreateDto>({
      query: reelsType => ({
        url: 'reels-types',
        method: 'POST',
        body: reelsType,
      }),
      invalidatesTags: [{ type: 'ReelsTypes', id: 'LIST' }],
    }),
    deleteReelsType: build.mutation<IReelsType, number>({
      query: id => ({
        url: `reels-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'ReelsTypes', id: 'LIST' }],
    }),
  }),
})

export const { useGetReelsTypesByProjectIdQuery, useCreateReelsTypesMutation, useDeleteReelsTypeMutation } =
  reelsTypesApi
