import { createApi } from '@reduxjs/toolkit/query/react'
import { ITag } from '../../interfaces/ITag'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  refetchOnFocus: true,
  tagTypes: ['Tags'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllTags: build.query<ITag[], void>({
      query: () => ({ url: `tags` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Tags' as const, id })), { type: 'Tags', id: 'LIST' }]
          : [{ type: 'Tags', id: 'LIST' }],
    }),
    createTag: build.mutation<ITag, ITag>({
      query: client => ({
        url: 'tags',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: [{ type: 'Tags', id: 'LIST' }],
    }),
  }),
})

export const { useGetAllTagsQuery, useCreateTagMutation } = tagsApi
