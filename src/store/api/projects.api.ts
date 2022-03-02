import { createApi } from '@reduxjs/toolkit/query/react'
import { IProject } from '../../interfaces/IProject'
import { IProjectData } from '../../modal/NewProjectModal'
import { getFetchBaseQuery } from './getFetchBaseQuery'

interface IParams {
  offset?: number
  limit?: number
}

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  refetchOnFocus: true,
  tagTypes: ['projects', 'project'],
  baseQuery: getFetchBaseQuery(),

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
