import { createApi } from '@reduxjs/toolkit/query/react'
import { IPost } from '../../interfaces/IPost'
import { getFetchBaseQuery } from './getFetchBaseQuery'
import { IPostData } from '../../layout/sendbar/Sendbar'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  refetchOnFocus: true,
  tagTypes: ['Posts'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllPosts: build.query<IPost[], void>({
      query: () => ({ url: `posts` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Posts' as const, id })), { type: 'Posts', id: 'LIST' }]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getPostsByProjectId: build.query<IPost[], number>({
      query: id => ({
        url: `posts/project/${id}`,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Posts' as const, id })), { type: 'Posts', id: 'LIST' }]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    createPost: build.mutation<IPost, IPostData>({
      query: post => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    deletePost: build.mutation<IPost, number>({
      query: id => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAllPostsQuery,
  useGetPostsByProjectIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApi
