import { IUser } from './IUser'

export interface IReelCreateDto {
  duration: number
  projectId: number
  reelsTypeId: number
  createdBy: IUser
}
