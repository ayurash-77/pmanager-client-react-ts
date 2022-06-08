import { createApi } from '@reduxjs/toolkit/query/react'
import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { apiBaseUrl } from '../../constants/env'
import { RootState } from '../store'

interface CustomError {
  data: { message: [] | string }
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  // refetchOnFocus: true,
  tagTypes: [
    'Agencies',
    'Brands',
    'Clients',
    'Jobs',
    'Users',
    'Roles',
    'Briefs',
    'BriefCategories',
    'Projects',
    'ReelsTypes',
    'Reels',
    'Shots',
    'Tags',
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE, OPTIONS')
      const token = (getState() as RootState).auth.authUser.token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: () => ({}),
})
