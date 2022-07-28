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

export interface IReelInputData {
  duration: number | null
  reelsTypeId: string | number
  highPriority: boolean
  highPriority2?: boolean
}

export interface IReelCreateDto extends IReelInputData {
  projectId: number
  createdBy: IUser
}
