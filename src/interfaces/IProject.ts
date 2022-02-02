import { IUser } from './IUser'

export interface IProject {
  id: number
  title: string
  homeDir: string
  createdAt: Date
  updatedAt: Date
  startAt?: any
  deadline?: any
  doneAt?: any
  details?: any
  owner: IUser
}
