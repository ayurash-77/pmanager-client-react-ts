import { IProject } from '../../interfaces/IProject'
import { providesList } from '../../utils/provides-list'
import { baseApi } from './base.api'

export const projectsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProjects: build.query<IProject[], void>({
      query: () => ({ url: `projects` }),
      providesTags: result => providesList(result, 'Projects'),
    }),
    getProject: build.query<IProject, number>({
      query: id => ({ url: `projects/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Projects', id }],
    }),
    createProject: build.mutation<IProject, Partial<IProject>>({
      query: data => ({ url: 'projects', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Projects', id: 'LIST' }],
    }),
    deleteProject: build.mutation<IProject, number>({
      query: id => ({ url: `projects/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Projects', id: 'LIST' }],
    }),
  }),
})

export const { useGetProjectsQuery, useGetProjectQuery, useCreateProjectMutation, useDeleteProjectMutation } =
  projectsApi
