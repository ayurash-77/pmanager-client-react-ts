import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProject } from '../interfaces/IProject'
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store/store'

interface CustomError {
  data: { message: [] | string }
}
interface IParams {
  offset?: number
  limit?: number
}

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authUser.token
      if (token) headers.set('authorization', `Bearer ${token}`)
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
    }),
    createProject: build.mutation<IProject, IProject>({
      query: project => ({
        url: 'projects',
        method: 'POST',
        body: project,
      }),
    }),
  }),
})

export const { useGetAllProjectsQuery } = projectsApi
