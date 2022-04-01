import { IUser } from './IUser'

export interface IReelsTypeCreateDto {
  projectId: number
  name: string
  code: string
  createdBy: IUser
}
