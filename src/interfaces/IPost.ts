import { IUser } from './IUser'
import { ITag } from './ITag'
import { IReel } from './IReel'
import { IShot } from './IShot'

export interface IPost {
  id: number
  title?: string
  message: string
  createdAt: Date
  updatedAt: Date
  createdBy: IUser
  reels?: IReel[]
  shots?: IShot[]
  shot?: IShot
  team?: IUser[]
  tags?: ITag[]
}
