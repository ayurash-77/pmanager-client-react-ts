import { createApi } from '@reduxjs/toolkit/query/react'
import { IPost } from '../../interfaces/IPost'
import { getFetchBaseQuery } from './getFetchBaseQuery'
import { IPostData } from '../../layout/sendbar/Sendbar'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  refetchOnFocus: true,
  tagTypes: ['post', 'project'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllPosts: build.query<IPost[], void>({
      query: () => ({ url: `posts` }),
      providesTags: ['post'],
    }),
    getPostsByProjectId: build.query<IPost[], number>({
      query: id => ({
        url: `posts/project/${id}`,
        method: 'GET',
      }),
      providesTags: ['post', 'project'],
    }),
    createPost: build.mutation<IPost, IPostData>({
      query: post => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['post', 'project'],
    }),
    deletePost: build.mutation<IPost, number>({
      query: id => ({
        url: `posts/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['post', 'project'],
    }),
  }),
})

export const { useGetAllPostsQuery, useGetPostsByProjectIdQuery, useCreatePostMutation } = postsApi
