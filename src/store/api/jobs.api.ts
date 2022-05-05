import { IJob } from '../../interfaces/IJob'
import { baseApi } from './base.api'

export const jobsApi = baseApi.injectEndpoints({
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
