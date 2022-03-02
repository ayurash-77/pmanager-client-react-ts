import { createApi } from '@reduxjs/toolkit/query/react'
import { IRole } from '../../interfaces/IRole'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  refetchOnFocus: true,
  tagTypes: ['roles'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllRoles: build.query<IRole[], void>({
      query: () => ({ url: `roles` }),
      providesTags: result => (result ? result.map(({ id }) => ({ type: 'roles', id })) : []),
    }),
    createRole: build.mutation<IRole, IRole>({
      query: role => ({
        url: 'roles',
        method: 'POST',
        body: role,
      }),
      invalidatesTags: ['roles'],
    }),
  }),
})

export const { useGetAllRolesQuery, useCreateRoleMutation } = rolesApi
