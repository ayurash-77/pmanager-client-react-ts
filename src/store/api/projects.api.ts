import { createApi } from '@reduxjs/toolkit/query/react'
import { IProject } from '../../interfaces/IProject'
import { IProjectData } from '../../modal/NewProjectModal'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  refetchOnFocus: true,
  tagTypes: ['project', 'post'],
  baseQuery: getFetchBaseQuery(),

  endpoints: build => ({
    getAllProjects: build.query<IProject[], {}>({
      query: () => ({ url: `projects` }),
      providesTags: ['project'],
    }),
    getProjectById: build.query<IProject, number>({
      query: id => ({
        url: `projects/${id}`,
        method: 'GET',
      }),
      providesTags: ['project', 'post'],
    }),
    createProject: build.mutation<IProject, IProjectData>({
      query: project => ({
        url: 'projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['project'],
    }),
    deleteProject: build.mutation<IProject, number>({
      query: id => ({
        url: `projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['project'],
    }),
  }),
})

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi
