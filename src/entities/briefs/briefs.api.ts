import { baseApi } from '../../store/base.api'
import { providesList } from '../../utils/provides-list'
import { IBriefData } from './NewBriefModal'
import { IBrief } from './briefs.interfaces'

export const briefsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getBriefs: build.query<IBrief[], number>({
      query: projectId => ({ url: `briefs?projectId=${projectId}` }),
      providesTags: result => providesList(result, 'Briefs'),
    }),

    getBriefsByProjectId: build.query<IBrief[], void>({
      query: projectId => ({ url: `briefs?projectId=${projectId}` }),
      providesTags: result => providesList(result, 'Briefs'),
    }),

    createBrief: build.mutation<IBrief, IBriefData>({
      query: brief => ({ url: 'briefs', method: 'POST', body: brief }),
      invalidatesTags: [
        { type: 'Briefs', id: 'LIST' },
        { type: 'Projects', id: 'LIST' },
      ],
    }),

    deleteBrief: build.mutation<IBrief, number>({
      query: id => ({ url: `briefs/${id}`, method: 'DELETE' }),
      invalidatesTags: [
        { type: 'Briefs', id: 'LIST' },
        { type: 'Projects', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetBriefsQuery,
  useGetBriefsByProjectIdQuery,
  useCreateBriefMutation,
  useDeleteBriefMutation,
} = briefsApi
