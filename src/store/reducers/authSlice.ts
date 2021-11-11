import { createSlice } from '@reduxjs/toolkit'
import { User, authApi } from '../../services/authApi'
import { RootState } from '../store'

type AuthState = {
  user: User | null
  token: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.token
      state.user = payload.user
    })
  },
})

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
