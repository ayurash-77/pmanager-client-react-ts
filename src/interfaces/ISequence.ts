import { IStatus } from './IStatus'
import { IUser } from './IUser'
import { IShot } from './IShot'
import { IReel } from './IReel'

export interface ISequence {
  id: number
  title: string
  code: string
  createdAt: Date
  updatedAt: Date
  progress: number
  status: IStatus
  duration: number
  startAt?: any
  doneAt?: any
  details?: string
  reel: IReel
  shots: IShot[]
}
