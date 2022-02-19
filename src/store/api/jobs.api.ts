import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IJob } from '../../interfaces/IJob'
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store'

interface CustomError {
  data: { message: [] | string }
}

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://pmanager:4000',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authUser.token
      if (token) headers.set('authorization', `Bearer ${token}`)
      headers.set('X-Api-Key', 'my-api-key-from-api-gateway')
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE, OPTIONS')
      return headers
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: build => ({
    getJobs: build.query<IJob[], { offset: number; limit: number }>({
      query: arg => {
        const { offset, limit } = arg
        return {
          url: `jobs`,
          params: { offset, limit },
        }
      },
    }),
    createJob: build.mutation<IJob, IJob>({
      query: job => ({
        url: 'jobs',
        method: 'POST',
        body: job,
      }),
    }),
  }),
})

export const { useGetJobsQuery, useCreateJobMutation } = jobsApi
