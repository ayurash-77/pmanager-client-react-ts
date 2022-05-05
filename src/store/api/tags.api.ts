import { ITag } from '../../interfaces/ITag'
import { baseApi } from './base.api'

export const tagsApi = baseApi.injectEndpoints({
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
