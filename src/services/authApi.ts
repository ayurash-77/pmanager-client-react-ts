import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../interfaces/IUser'

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: '/auth/' }),

  endpoints: build => ({
    auth: build.query({
      query: user => {
        return {
          url: `login`,
          method: 'POST',
          body: user,
        }
      },
    }),
  }),
})

export const { useAuthQuery } = authApi
