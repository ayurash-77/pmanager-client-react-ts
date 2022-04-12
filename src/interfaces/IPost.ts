import { IUser } from './IUser'
import { ITag } from './ITag'
import { IReel } from './IReel'

export interface IPost {
  id: number
  title?: string
  message: string
  createdAt: Date
  updatedAt: Date
  createdBy: IUser
  reel?: IReel
  team?: IUser[]
  tags?: ITag[]
}
