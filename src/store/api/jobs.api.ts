import { createApi } from '@reduxjs/toolkit/query/react'
import { IJob } from '../../interfaces/IJob'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  tagTypes: ['Jobs'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getJobs: build.query<IJob[], void>({
      query: () => ({ url: `jobs` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Jobs' as const, id })), { type: 'Jobs', id: 'LIST' }]
          : [{ type: 'Jobs', id: 'LIST' }],
    }),
    createJob: build.mutation<IJob, IJob>({
      query: job => ({
        url: 'jobs',
        method: 'POST',
        body: job,
      }),
      invalidatesTags: [{ type: 'Jobs', id: 'LIST' }],
    }),
  }),
})

export const { useGetJobsQuery, useCreateJobMutation } = jobsApi
