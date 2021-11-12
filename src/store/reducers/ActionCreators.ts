import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces/IUser'

export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get<IUser[]>('/users')
    return response.data
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить пользователей')
  }
})
