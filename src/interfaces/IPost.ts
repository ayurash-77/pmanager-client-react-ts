import { IUser } from './IUser'
import { ITag } from './ITag'

export interface IPost {
  id: number
  title?: string
  message: string
  createdAt: Date
  updatedAt: Date
  createdBy: IUser
  team?: IUser[]
  tags?: ITag[]
}
