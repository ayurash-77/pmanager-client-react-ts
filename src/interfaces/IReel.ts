import { IStatus } from './IStatus'
import { IUser } from './IUser'
import { IShot } from './IShot'
import { IReelsType } from './IReelsType'

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
