import { createApi } from '@reduxjs/toolkit/query/react'
import { IUser } from '../../interfaces/IUser'
import { getFetchBaseQuery } from './getFetchBaseQuery'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  // refetchOnFocus: true,
  tagTypes: ['Users'],
  baseQuery: getFetchBaseQuery(),
  endpoints: build => ({
    getAllUsers: build.query<IUser[], void>({
      query: () => ({ url: `users` }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Users' as const, id })), { type: 'Users', id: 'LIST' }]
          : [{ type: 'Users', id: 'LIST' }],
    }),

    // getCurrentUser: build.query<IUser, Partial<IUser>>({
    //   query: id => ({ url: `user` }),
    //   providesTags: (result, error, id) => [{ type: 'Users', id }],
    // }),

    getUserById: build.query<IUser, number>({
      query: id => ({ url: `users/${id}` }),
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),

    createUser: build.mutation<IUser, Partial<IUser>>({
      query: user => ({
        url: 'users/register',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    updateUserById: build.mutation<IUser, Partial<IUser>>({
      query: user => ({
        url: `users/${user.id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Users', id: arg.id }],
    }),

    updateUser: build.mutation<IUser, Partial<IUser>>({
      query: user => ({
        url: `user`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Users', id: arg.id }],
    }),

    deleteUser: build.mutation<IUser, number>({
      query: id => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi
