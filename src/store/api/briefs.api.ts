import { IBrief } from '../../interfaces/IBrief'
import { IBriefData } from '../../modal/NewBriefModal'
import { IBriefCategory } from '../../interfaces/IBriefCategory'
import { baseApi } from './base.api'
import { providesList } from '../../utils/provides-list'

export const briefsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getBriefs: build.query<IBrief[], void>({
      query: projectId => ({ url: `briefs?projectId=${projectId}` }),
      providesTags: result => providesList(result, 'Briefs'),
    }),

    getBriefsByProjectId: build.query<IBrief[], void>({
      query: projectId => ({ url: `briefs?projectId=${projectId}` }),
      providesTags: result => providesList(result, 'Briefs'),
    }),

    getBriefCategories: build.query<IBriefCategory[], void>({
      query: () => ({ url: `briefs-categories` }),
      providesTags: result => providesList(result, 'BriefCategories'),
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
  useGetBriefCategoriesQuery,
} = briefsApi
