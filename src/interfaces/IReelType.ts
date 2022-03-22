import { IUser } from './IUser'
import { IReel } from './IReel'
import { IShot } from './IShot'

export interface IReelType {
  id: number
  name: string
  code: string
  projectId: string
  reels: IReel[]
  shots: IShot[]
  createdBy: IUser
}
