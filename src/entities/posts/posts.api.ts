import { IPostData } from '../../components/layout/sendbar/Sendbar'
import { baseApi } from '../../store/base.api'
import { providesList } from '../../utils/provides-list'
import { IPost } from './posts.interfaces'

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPosts: build.query<IPost[], number>({
      query: projectId => ({ url: `posts?projectId=${projectId}` }),
      providesTags: result => providesList(result, 'Posts'),
    }),
    getPost: build.query<IPost, number>({
      query: id => ({ url: `posts/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    createPost: build.mutation<IPost, IPostData>({
      query: data => ({ url: 'posts', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    deletePost: build.mutation<IPost, number>({
      query: id => ({ url: `posts/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useCreatePostMutation, useDeletePostMutation } = postsApi