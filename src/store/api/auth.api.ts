import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../../interfaces/IUser'
import { IUserAuth } from '../../interfaces/IUserAuth'
import { RootState } from '../store'

export interface CustomError {
  data: { message: [] | string }
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://pmanager:4000',
    prepareHeaders: headers => {
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE, OPTIONS')
      return headers
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,

  endpoints: build => ({
    login: build.mutation<IUser, IUserAuth>({
      query: user => ({ url: 'users/login', method: 'POST', body: user }),
    }),
  }),
})

export const { useLoginMutation } = authApi
