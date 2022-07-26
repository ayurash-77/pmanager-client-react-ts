import { baseApi } from '../../store/base.api'
import { providesList } from '../../utils/provides-list'
import { IBriefsCategory } from './briefsCategories.intefaces'

export const briefsCategoriesApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getBriefCategories: build.query<IBriefsCategory[], void>({
      query: () => ({ url: `briefs-categories` }),
      providesTags: result => providesList(result, 'BriefCategories'),
    }),
  }),
})

export const { useGetBriefCategoriesQuery } = briefsCategoriesApi
