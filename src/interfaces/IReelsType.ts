import { IUser } from './IUser'
import { IReel } from './IReel'
import { IShot } from './IShot'
import { IStatus } from './IStatus'

export interface IReelsType {
  id?: number
  name: string
  code: string
  projectId: number
  status?: IStatus
  progress: number
  reels?: IReel[]
  shots?: IShot[]
  createdBy: IUser
}
