import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseUrl } from '../../constants/env'
import { IUser } from '../../interfaces/IUser'
import { IUserAuth } from '../../interfaces/IUserAuth'

export interface CustomError {
  data: { message: [] | string }
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE, OPTIONS')
      // const token = (getState() as RootState).auth.authUser.token
      // if (token) headers.set('authorization', `Bearer ${token}`)
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
