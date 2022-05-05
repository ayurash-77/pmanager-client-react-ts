import { IRole } from '../../interfaces/IRole'
import { baseApi } from './base.api'

export const rolesApi = baseApi.injectEndpoints({
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
