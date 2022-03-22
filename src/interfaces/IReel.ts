import { IStatus } from './IStatus'
import { IUser } from './IUser'
import { IShot } from './IShot'
import { IReelType } from './IReelType'

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
  reelsType: IReelType
  shots: IShot[]
}
