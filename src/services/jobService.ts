import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IJob } from '../interfaces/IJob'

export const jobsApi = createApi({
  reducerPath: 'jobs',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),

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
