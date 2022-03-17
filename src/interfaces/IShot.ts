import { IStatus } from './IStatus'
import { IUser } from './IUser'
import { ISequence } from './ISequence'

export interface IShot {
  id: number
  name: string
  code: string
  version: string
  createdAt: Date
  updatedAt: Date
  progress: number
  status: IStatus
  duration: number
  startAt?: any
  doneAt?: any
  details?: string
  sequences?: ISequence[]
  users?: IUser[]
}
