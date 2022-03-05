import { createApi } from '@reduxjs/toolkit/query/react'
import { ITag } from '../../interfaces/ITag'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  refetchOnFocus: true,
  tagTypes: ['tags'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllTags: build.query<ITag[], void>({
      query: () => ({ url: `tags` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'tags', id })) : []),
    }),
    createTag: build.mutation<ITag, ITag>({
      query: client => ({
        url: 'tags',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: ['tags'],
    }),
  }),
})

export const { useGetAllTagsQuery, useCreateTagMutation } = tagsApi
