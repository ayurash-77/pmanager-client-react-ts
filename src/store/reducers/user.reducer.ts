import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../entities/users/users.interfaces'

interface IInitialState {
  authUser: IUser
}

const initialState: IInitialState = {
  authUser: JSON.parse(localStorage.getItem('authUser')),
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<IUser>) {
      state.authUser = action.payload
      localStorage.setItem('authUser', JSON.stringify(action.payload))
    },
    logout(state) {
      state.authUser = null
      localStorage.setItem('authUser', null)
    },
  },
})

export const { setAuthUser, logout } = userSlice.actions
export default userSlice.reducer
