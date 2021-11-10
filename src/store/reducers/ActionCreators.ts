import axios from 'axios'
import { AppDispatch } from '../store'
import { IUser } from '../../interfaces/IUser'
import { userSlice } from './UserSlice'

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.getUsers())
    const response = await axios.get<IUser[]>('/users')
    dispatch(userSlice.actions.getUsersSuccess(response.data))
  } catch (e) {
    console.log(e.message)
    dispatch(userSlice.actions.getUsersFail(e.message))
  }
}
