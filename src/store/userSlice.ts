import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../interfaces/IUser'

interface IAuth {
  authUser: IUser
}

const initialState: IAuth = {
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

export const { setAuthUser } = userSlice.actions
export default userSlice.reducer
