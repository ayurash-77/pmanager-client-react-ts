import { IReel } from 'entities/reels/reels.interfaces'
import { IStatus } from '../statuses/statuses.interfaces'
import { IUser } from '../users/users.interfaces'

export interface IShot {
  id: number
  name?: string
  code: string
  version?: string
  createdAt?: Date
  updatedAt?: Date
  progress?: number
  status?: IStatus
  duration?: number
  startAt?: any
  doneAt?: any
  details?: string
  reels?: IReel[]
  users?: IUser[]
}

export interface IShotCreateDto {
  projectId: number
  number: string
  reelId: number
  createdBy: IUser
  duration?: number
}
