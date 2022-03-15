import { createApi } from '@reduxjs/toolkit/query/react'
import { IPost } from '../../interfaces/IPost'
import { getFetchBaseQuery } from './getFetchBaseQuery'
import { IPostData } from '../../layout/sendbar/Sendbar'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  refetchOnFocus: true,
  tagTypes: ['posts'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllPosts: build.query<IPost[], void>({
      query: () => ({ url: `posts` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'posts', id })) : []),
    }),
    getPostsByProjectId: build.query<IPost[], number>({
      query: id => ({
        url: `posts/project/${id}`,
        method: 'GET',
      }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'posts', id })) : []),
    }),
    createPost: build.mutation<IPost, IPostData>({
      query: post => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['posts'],
    }),
    deletePost: build.mutation<IPost, number>({
      query: id => ({
        url: `posts/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['posts'],
    }),
  }),
})

export const { useGetAllPostsQuery, useGetPostsByProjectIdQuery, useCreatePostMutation } = postsApi
