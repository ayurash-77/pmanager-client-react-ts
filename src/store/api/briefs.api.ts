import { IBrief } from '../../interfaces/IBrief'
import { IBriefData } from '../../modal/NewBriefModal'
import { IBriefCategory } from '../../interfaces/IBriefCategory'
import { baseApi } from './base.api'

export const briefsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllBriefs: build.query<IBrief[], void>({
      query: () => ({ url: `briefs` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'briefs', id })) : []),
    }),
    getAllBriefCategories: build.query<IBriefCategory[], void>({
      query: () => ({ url: `briefs-categories` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'briefCategories', id })) : []),
    }),
    getBrief: build.query<IBrief, number>({
      query: id => ({
        url: `briefs/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'briefs', id }],
    }),
    createBrief: build.mutation<IBrief, IBriefData>({
      query: brief => ({
        url: 'briefs',
        method: 'POST',
        body: brief,
      }),
      invalidatesTags: ['briefs', 'Projects'],
    }),
    deleteBrief: build.mutation<IBrief, number>({
      query: id => ({
        url: `briefs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['briefs', 'Projects'],
    }),
  }),
})

export const {
  useGetAllBriefsQuery,
  useGetBriefQuery,
  useCreateBriefMutation,
  useDeleteBriefMutation,
  useGetAllBriefCategoriesQuery,
} = briefsApi
