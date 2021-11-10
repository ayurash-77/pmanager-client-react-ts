import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../interfaces/IUser'

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),

  endpoints: build => ({
    getUsers: build.query<IUser[], { offset: number; limit: number }>({
      query: arg => {
        const { offset, limit } = arg
        return {
          url: `users`,
          params: { offset, limit },
        }
      },
    }),
    createUser: build.mutation<IUser, IUser>({
      query: user => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

export const { useGetUsersQuery, useCreateUserMutation } = usersApi
