import { createApi } from '@reduxjs/toolkit/query/react'
import { IProject } from '../../interfaces/IProject'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  refetchOnFocus: true,
  tagTypes: ['Projects'],
  baseQuery: getFetchBaseQuery(),

  endpoints: build => ({
    getAllProjects: build.query<IProject[], void>({
      query: () => ({ url: `projects` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Projects' as const, id })), { type: 'Projects', id: 'LIST' }]
          : [{ type: 'Projects', id: 'LIST' }],
    }),
    getProjectById: build.query<IProject, number>({
      query: id => ({
        url: `projects/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Projects', id }],
    }),
    createProject: build.mutation<IProject, Partial<IProject>>({
      query: project => ({
        url: 'Projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: [{ type: 'Projects', id: 'LIST' }],
    }),
    deleteProject: build.mutation<IProject, number>({
      query: id => ({
        url: `projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Projects', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useLazyGetProjectByIdQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi
