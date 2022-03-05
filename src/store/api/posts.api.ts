import { createApi } from '@reduxjs/toolkit/query/react'
import { IPost } from '../../interfaces/IPost'
import { getFetchBaseQuery } from './getFetchBaseQuery'
import { IPostData } from '../../components/sendbar/Sendbar'
import { createEntityAdapter } from '@reduxjs/toolkit'

const postsAdapter = createEntityAdapter<IPost>({
  sortComparer: (a, b) => a.createdAt.toString().localeCompare(b.toString()),
})

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
