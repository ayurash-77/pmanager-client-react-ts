import { IRole } from '../roles/roles.interfaces'

export interface IUser {
  id?: number
  username: string
  email: string
  isAdmin: boolean
  token: string
  surname?: string
  name?: string
  phone?: string
  image?: any
  role: IRole
}

export interface IUserInputData {
  username: string
  password: string
}
