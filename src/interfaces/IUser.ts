import { IRole } from './IRole'

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
