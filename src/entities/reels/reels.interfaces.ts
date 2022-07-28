import { IReelsType } from '../reelsTypes/reelsTypes.interfaces'
import { IShot } from '../shots/shots.interfaces'
import { IStatus } from '../statuses/statuses.interfaces'
import { IUser } from '../users/users.interfaces'

export interface IReel {
  id: number
  name: string
  duration: number
  code: string
  projectId: number
  createdAt?: Date
  updatedAt?: Date
  highPriority: boolean
  progress: number
  status?: IStatus
  startAt?: any
  doneAt?: any
  reelsType?: IReelsType
  reelsTypeId?: number
  shots: IShot[]
  shotsIds: number[]
  createdBy: IUser
}

export interface IReelCreateDto {
  duration: number
  projectId: number
  reelsTypeId: number
  createdBy: IUser
  highPriority: boolean
}

export interface IReelInputData {
  duration: number
  reelsTypeId: number
  highPriority: boolean
}
