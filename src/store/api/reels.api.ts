import { IReel } from '../../interfaces/IReel'
import { IReelCreateDto } from '../../interfaces/IReelCreateDto'
import { baseApi } from './base.api'
import { providesList } from '../../utils/provides-list'

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
      invalidatesTags: [{ type: 'Reels', id: 'LIST' }],
    }),
    updateReel: build.mutation<IReel, Partial<IReel>>({
      query: reel => ({ url: `reels/${reel.id}`, method: 'PATCH', body: reel }),
      invalidatesTags: (result, error, arg) => [{ type: 'Reels', id: arg.id }],
    }),
    deleteReel: build.mutation<IReel, number>({
      query: id => ({ url: `reels/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Reels', id: 'LIST' }],
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
