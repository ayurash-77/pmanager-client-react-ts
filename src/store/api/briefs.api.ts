import { createApi } from '@reduxjs/toolkit/query/react'
import { IBrief } from '../../interfaces/IBrief'
import { IBriefData } from '../../modal/NewBriefModal'
import { IBriefCategory } from '../../interfaces/IBriefCategory'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const briefsApi = createApi({
  reducerPath: 'briefsApi',
  refetchOnFocus: true,
  tagTypes: ['briefs', 'brief', 'briefCategories'],
  baseQuery: getFetchBaseQuery(),

  endpoints: build => ({
    getAllBriefs: build.query<IBrief[], void>({
      query: () => ({ url: `briefs` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'briefs', id })) : []),
    }),
    getAllBriefCategories: build.query<IBriefCategory[], void>({
      query: () => ({ url: `brief-categories` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'briefCategories', id })) : []),
    }),
    getBrief: build.query<IBrief, number>({
      query: id => ({
        url: `briefs/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'brief', id }],
    }),
    createBrief: build.mutation<IBrief, IBriefData>({
      query: brief => ({
        url: 'briefs',
        method: 'POST',
        body: brief,
      }),
      invalidatesTags: ['briefs'],
    }),
    deleteBrief: build.mutation<IBrief, number>({
      query: id => ({
        url: `briefs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['briefs'],
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
