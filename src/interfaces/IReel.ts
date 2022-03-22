import { IStatus } from './IStatus'
import { IUser } from './IUser'
import { IShot } from './IShot'
import { IReelsType } from './IReelsType'

export interface IReel {
  id: number
  name: string
  code: string
  createdAt: Date
  updatedAt: Date
  progress: number
  status: IStatus
  duration: number
  startAt?: any
  doneAt?: any
  details?: string
  reelsType: IReelsType
  shots: IShot[]
}
