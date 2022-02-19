import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProject } from '../../interfaces/IProject'
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store'
import { IProjectData } from '../../modal/NewProjectModal'

interface CustomError {
  data: { message: [] | string }
}
interface IParams {
  offset?: number
  limit?: number
}

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  refetchOnFocus: true,
  tagTypes: ['projects', 'project'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://pmanager:4000',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authUser.token
      if (token) headers.set('authorization', `Bearer ${token}`)
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE, OPTIONS')
      return headers
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,

  endpoints: build => ({
    getAllProjects: build.query<IProject[], IParams>({
      query: arg => {
        if (!arg) return null
        const { offset, limit } = arg
        return {
          url: `projects`,
          params: { offset, limit },
        }
      },
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'projects', id })) : []),
    }),
    getProject: build.query<IProject, number>({
      query: id => ({
        url: `projects/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'project', id }],
    }),
    createProject: build.mutation<IProject, IProjectData>({
      query: project => ({
        url: 'projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['projects'],
    }),
    deleteProject: build.mutation<IProject, number>({
      query: id => ({
        url: `projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['projects'],
    }),
  }),
})

export const {
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useLazyGetProjectQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi
