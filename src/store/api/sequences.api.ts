import { createApi } from '@reduxjs/toolkit/query/react'
import { ISequence } from '../../interfaces/ISequence'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const sequencesApi = createApi({
  reducerPath: 'sequencesApi',
  refetchOnFocus: true,
  tagTypes: ['sequences'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllSequences: build.query<ISequence[], void>({
      query: () => ({ url: `sequences` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'sequences', id })) : []),
    }),
    getSequencesByProjectId: build.query<ISequence[], number>({
      query: projectId => ({ url: `sequences/projects/${projectId}` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'sequences', id })) : []),
    }),
    createSequence: build.mutation<ISequence, ISequence>({
      query: sequence => ({
        url: 'sequences',
        method: 'POST',
        body: sequence,
      }),
      invalidatesTags: ['sequences'],
    }),
  }),
})

export const { useGetAllSequencesQuery, useGetSequencesByProjectIdQuery, useCreateSequenceMutation } =
  sequencesApi
