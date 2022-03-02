import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { apiBaseUrl } from '../../constants/env'
import { RootState } from '../store'

interface CustomError {
  data: { message: [] | string }
}

export function getFetchBaseQuery() {
  return fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authUser.token
      if (token) headers.set('authorization', `Bearer ${token}`)
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE, OPTIONS')
      return headers
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>
}
