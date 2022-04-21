import { createApi } from '@reduxjs/toolkit/query/react'
import { IRole } from '../../interfaces/IRole'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  // refetchOnFocus: true,
  tagTypes: ['Roles'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllRoles: build.query<IRole[], void>({
      query: () => ({ url: `roles` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Roles' as const, id })), { type: 'Roles', id: 'LIST' }]
          : [{ type: 'Roles', id: 'LIST' }],
    }),
    createRole: build.mutation<IRole, IRole>({
      query: role => ({
        url: 'roles',
        method: 'POST',
        body: role,
      }),
      invalidatesTags: [{ type: 'Roles', id: 'LIST' }],
    }),
  }),
})

export const { useGetAllRolesQuery, useCreateRoleMutation } = rolesApi
