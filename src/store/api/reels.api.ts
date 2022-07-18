import { IReel } from '../../interfaces/IReel'
import { IReelCreateDto } from '../../interfaces/IReelCreateDto'
import { providesList } from '../../utils/provides-list'
import { baseApi } from './base.api'

export const reelsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getReels: build.query<IReel[], number>({
      query: projectId => ({ url: `reels?projectId=${projectId}` }),
      providesTags: result => providesList(result, 'Reels'),
    }),
    getReel: build.query<IReel, number>({
      query: id => ({ url: `reels/${id}` }),
      providesTags: (result, error, id) => [{ type: 'Reels', id }],
    }),
    createReel: build.mutation<IReel, IReelCreateDto>({
      query: reel => ({ url: 'reels', method: 'POST', body: reel }),
      invalidatesTags: [
        { type: 'Reels', id: 'LIST' },
        { type: 'ReelsTypes', id: 'LIST' },
      ],
    }),
    updateReel: build.mutation<IReel, Partial<IReel>>({
      query: reel => ({ url: `reels/${reel.id}`, method: 'PATCH', body: reel }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Reels', id: arg.id },
        { type: 'ReelsTypes', id: arg.reelsTypeId },
        { type: 'Shots', id: 'LIST' },
      ],
    }),
    deleteReel: build.mutation<IReel, number>({
      query: id => ({ url: `reels/${id}`, method: 'DELETE' }),
      invalidatesTags: [
        { type: 'Reels', id: 'LIST' },
        { type: 'ReelsTypes', id: 'LIST' },
        { type: 'Shots', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetReelsQuery,
  useGetReelQuery,
  useCreateReelMutation,
  useUpdateReelMutation,
  useDeleteReelMutation,
} = reelsApi
