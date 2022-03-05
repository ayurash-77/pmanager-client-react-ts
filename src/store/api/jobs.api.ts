import { createApi } from '@reduxjs/toolkit/query/react'
import { IJob } from '../../interfaces/IJob'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getJobs: build.query<IJob[], void>({
      query: () => ({ url: `jobs` }),
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
