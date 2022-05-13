import { IBrief } from '../../interfaces/IBrief'
import { IBriefData } from '../../modal/NewBriefModal'
import { IBriefCategory } from '../../interfaces/IBriefCategory'
import { baseApi } from './base.api'

export const briefsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllBriefCategories: build.query<IBriefCategory[], void>({
      query: () => ({ url: `briefs-categories` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'briefCategories', id })) : []),
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

export const { useCreateBriefMutation, useDeleteBriefMutation, useGetAllBriefCategoriesQuery } = briefsApi
