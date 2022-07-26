import { IReel } from 'entities/reels/reels.interfaces'
import { IShot } from 'entities/shots/shots.interfaces'
import { IStatus } from 'entities/statuses/statuses.interfaces'
import { IUser } from 'entities/users/users.interfaces'

export interface IReelsType {
  id: number
  name: string
  code: string
  projectId: number
  status?: IStatus
  progress: number
  reels?: IReel[]
  shots?: IShot[]
  createdBy: IUser
}

export interface IReelsTypeCreateDto {
  projectId: number
  name: string
  code: string
  createdBy: IUser
}

export interface IReelsTypeInputData {
  name: string
  code: string
}
