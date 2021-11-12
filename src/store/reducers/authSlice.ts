import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces/IUser'

interface UserState {
  users: IUser[]
  isLoading: boolean
  error: string
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers(state) {
      state.isLoading = true
    },
    getUsersSuccess(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false
      state.users = action.payload
      state.error = ''
    },
    getUsersFail(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default userSlice.reducer
