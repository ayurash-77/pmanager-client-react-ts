import { IUser } from './IUser'
import { IReel } from './IReel'
import { IShot } from './IShot'

export interface IReelsType {
  id?: number
  name: string
  code: string
  projectId: number
  reels?: IReel[]
  shots?: IShot[]
  createdBy: IUser
}
