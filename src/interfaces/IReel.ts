import { IUser } from './IUser'
import { ISequence } from './ISequence'
import { IShot } from './IShot'

export interface IReel {
  id: number
  name: string
  code: string
  projectId: string
  sequences: ISequence[]
  shots: IShot[]
  createdBy: IUser
}
