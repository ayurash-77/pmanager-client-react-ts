import { IReel } from 'entities/reels/reels.interfaces'
import { IShot } from '../shots/shots.interfaces'
import { ITag } from '../tags/tags.interfaces'
import { IUser } from '../users/users.interfaces'

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

export interface IPostData extends Partial<IPost> {
  projectId: number
  reelId?: number
  reelsIds?: number[]
  shotId?: number
  shotsIds?: number[]
}
