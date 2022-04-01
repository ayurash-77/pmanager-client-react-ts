import { IUser } from './IUser'

export interface IShotCreateDto {
  projectId: number
  number: string
  reelId: number
  createdBy: IUser
  duration?: number
}
