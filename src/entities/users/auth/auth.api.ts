import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseUrl } from 'constants/env'
import { IUser, IUserInputData } from 'entities/users/users.interfaces'
import { CustomError } from 'store/base.api'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: headers => {
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE, OPTIONS')
      return headers
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: build => ({
    login: build.mutation<IUser, IUserInputData>({
      query: user => ({ url: 'users/login', method: 'POST', body: user }),
    }),
  }),
})

export const { useLoginMutation } = authApi
