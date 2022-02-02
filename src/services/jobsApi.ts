import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IJob } from '../interfaces/IJob'
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/dist/query/react'

interface CustomError {
  data: { message: [] | string }
}

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,

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
