import { providesList } from 'utils/provides-list'
import { baseApi } from 'store/base.api'
import { IReelsType, IReelsTypeCreateDto } from './reelsTypes.interfaces'

export const reelsTypesApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getReelsTypes: build.query<IReelsType[], number>({
      query: projectId => ({ url: `reels-types?projectId=${projectId}` }),
      providesTags: result => providesList(result, 'ReelsTypes'),
    }),
    getReelsType: build.query<IReelsType, number>({
      query: id => ({ url: `reels-types/${id}` }),
      providesTags: (result, error, id) => [{ type: 'ReelsTypes', id }],
    }),
    createReelsTypes: build.mutation<IReelsType, IReelsTypeCreateDto>({
      query: body => ({ url: 'reels-types', method: 'POST', body: body }),
      invalidatesTags: [{ type: 'ReelsTypes', id: 'LIST' }],
    }),
    updateReelsTypes: build.mutation<IReelsType, Partial<IReelsType>>({
      query: body => ({ url: `reels-types/${body.id}`, method: 'PATCH', body: body }),
      invalidatesTags: [{ type: 'ReelsTypes', id: 'LIST' }],
    }),
    deleteReelsType: build.mutation<IReelsType, number>({
      query: id => ({ url: `reels-types/${id}`, method: 'DELETE' }),
      invalidatesTags: [
        { type: 'ReelsTypes', id: 'LIST' },
        { type: 'Reels', id: 'LIST' },
        { type: 'Shots', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetReelsTypesQuery, useCreateReelsTypesMutation, useDeleteReelsTypeMutation } =
  reelsTypesApi
