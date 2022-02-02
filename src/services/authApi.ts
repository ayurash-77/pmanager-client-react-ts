import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../interfaces/IUser'
import { IUserAuth } from '../interfaces/IUserAuth'

export interface CustomError {
  data: { message: [] | string }
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,

  endpoints: build => ({
    login: build.mutation<IUser, IUserAuth>({
      query: user => ({ url: 'users/login', method: 'POST', body: user }),
    }),
  }),
})

export const { useLoginMutation } = authApi
